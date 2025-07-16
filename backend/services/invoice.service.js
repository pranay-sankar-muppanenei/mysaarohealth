const Invoice = require('../models/invoice');
const { generateInvoiceId } = require('../utils/helpers');
const { generateInvoicePDF } = require('../utils/pdfGenerator');
const { validateInvoice } = require('../validations/invoice.validation');

const createInvoice = async ( doctorId, invoiceData, invoiceId ) => {
  try {
    const {
      name,
      uid,
      phone,
      paymentStatus,
      privateNote,
      items,
      additionalDiscountAmount,
      totalAmount,
      paymentMode,
      patientNote,
    } = invoiceData;

    const invoiceValidation = validateInvoice(invoiceData);
    if (!invoiceValidation.success) {
      return {
        statusCode: 400,
        error: invoiceValidation.errors,
      };
    }

    let invoice;
    if (invoiceId) {
      invoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        {
          doctorId,
          name,
          uid,
          phone,
          paymentStatus,
          privateNote,
          items,
          additionalDiscountAmount,
          totalAmount,
          paymentMode,
          patientNote,
        },
        { new: true },
      );

      if (!invoice) {
        return {
          statusCode: 404,
          error: 'Invoice not found',
        };
      }
    } else {
      const invoiceId = await generateInvoiceId();
      invoice = new Invoice({
        doctorId,
        name,
        uid,
        invoiceId,
        phone,
        paymentStatus,
        privateNote,
        items,
        additionalDiscountAmount,
        totalAmount,
        paymentMode,
        patientNote,
      });
      await invoice.save();
    }
    await generateInvoicePDF(invoice);

    return {
      statusCode: 201,
      invoice,
      invoiceUrl: `${process.env.SERVER_URL}/public/invoices/invoice_${invoice._id}.pdf`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const getInvoicesByDoctorId = async (doctorId) => {
  try {
    const invoices = await Invoice.find({
      doctorId,
    });

    return {
      statusCode: 200,
      invoices: invoices,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const getInvoiceById = async (invoiceId) => {
  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return {
        statusCode: 404,
        error: `Invoice with Id ${invoiceId} not found`,
      };
    }

    return {
      statusCode: 200,
      invoice: invoice,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const deleteInvoiceById = async (invoiceId) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!invoice) {
      return {
        statusCode: 404,
        error: `Invoice with Id ${invoiceId} not found`,
      };
    }

    return {
      statusCode: 204,
      invoice: invoice,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

module.exports = {
  createInvoice,
  getInvoicesByDoctorId,
  getInvoiceById,
  deleteInvoiceById,
};
