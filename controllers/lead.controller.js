const leadService = require('../services/lead.service');
const clientService = require('../services/client.service');

exports.captureLead = async (req, res) => {
  try {
  console.log("------------client api calling---")
    const { clientId } = req.params;

    const lead = await leadService.createLead(req.body, clientId);
    const client = await clientService.getClientById(clientId);

    const msg = `Hi, I'm ${lead.name}. ${lead.message}`;
    const url = `https://wa.me/${client.whatsapp_number}?text=${encodeURIComponent(msg)}`;

    return res.status(201).json({
      success: true,
      message: "Lead captured",
      data: {
        lead_id: lead.id,
        redirect_url: url
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Lead capture failed",
      error: { code: "SERVER_ERROR", details: err.message }
    });
  }
};


exports.getLeads = async (req, res) => {
  try {
    console.log("---------leads-----fetching")
    const leads = await leadService.getLeads(req.query, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error: { code: "SERVER_ERROR", details: err.message }
    });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status required",
        error: { code: "VALIDATION_ERROR", details: "Missing status" }
      });
    }

    await leadService.updateStatus(req.params.id, status);

    return res.status(200).json({
      success: true,
      message: "Lead status updated",
      data: {
        lead_id: req.params.id,
        status
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Update failed",
      error: { code: "SERVER_ERROR", details: err.message }
    });
  }
};



