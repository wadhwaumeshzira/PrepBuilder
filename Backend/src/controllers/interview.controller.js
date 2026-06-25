const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
const crypto = require("crypto")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {

    let resumeText = ""
    if (req.file && req.file.buffer) {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        resumeText = resumeContent.text
    }

    const { selfDescription, jobDescription } = req.body

    const rawInput = (resumeText || '') + (selfDescription || '') + (jobDescription || '');
    const inputHash = crypto.createHash('sha256').update(rawInput).digest('hex');

    const existingReport = await interviewReportModel.findOne({ user: req.user.id, inputHash });
    
    if (existingReport) {
        return res.status(200).json({
            message: "Cached interview report returned successfully.",
            interviewReport: existingReport
        });
    }

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeText,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        inputHash,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -dsaTopics -systemDesignTopics -inputHash")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


/**
 * @description Controller to delete interview report by interviewId.
 */
async function deleteInterviewReportController(req, res) {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOneAndDelete({ _id: interviewId, user: req.user.id });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found or you do not have permission to delete it."
        });
    }

    res.status(200).json({
        message: "Interview report deleted successfully."
    });
}

/**
 * @description Controller to generate study guide PDF.
 */
async function generateStudyGuidePdfController(req, res) {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findById(interviewId);
    
    if (!interviewReport) {
        return res.status(404).json({ message: "Interview report not found." });
    }

    // Build raw HTML for the PDF
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; }
                h1 { color: #1a1a1a; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
                h2 { color: #d4af37; margin-top: 30px; }
                h3 { color: #555; }
                .card { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d4af37; }
                .tag { display: inline-block; background: #eee; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <h1>Interview Study Guide: ${interviewReport.title || 'Untitled'}</h1>
            <p><strong>Match Score:</strong> ${interviewReport.matchScore}%</p>
            <p>Generated on ${new Date(interviewReport.createdAt).toLocaleDateString()}</p>
            
            <h2>Technical Questions</h2>
            ${interviewReport.technicalQuestions?.map((q, i) => `
                <div class="card">
                    <h3>Q${i+1}: ${q.question}</h3>
                    <div class="tag">${q.intention}</div>
                    <p><strong>Ideal Answer:</strong> ${q.answer}</p>
                </div>
            `).join('') || '<p>None</p>'}

            <h2>Behavioral Questions</h2>
            ${interviewReport.behavioralQuestions?.map((q, i) => `
                <div class="card">
                    <h3>Q${i+1}: ${q.question}</h3>
                    <div class="tag">${q.intention}</div>
                    <p><strong>Ideal Answer:</strong> ${q.answer}</p>
                </div>
            `).join('') || '<p>None</p>'}
            
            <h2>Expected DSA Topics</h2>
            ${interviewReport.dsaTopics?.map((t, i) => `
                <div class="card">
                    <h3>${i+1}. ${t.topic}</h3>
                    <p>${t.relevance}</p>
                </div>
            `).join('') || '<p>None</p>'}

            <h2>System Design Topics</h2>
            ${interviewReport.systemDesignTopics?.map((t, i) => `
                <div class="card">
                    <h3>${i+1}. ${t.topic}</h3>
                    <p>${t.relevance}</p>
                </div>
            `).join('') || '<p>None</p>'}
            
        </body>
        </html>
    `;

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'], headless: true, executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true, margin: { top: "20px", bottom: "20px" } });
    await browser.close();

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Study_Guide_${interviewId}.pdf`
    });
    res.send(pdfBuffer);
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, deleteInterviewReportController, generateStudyGuidePdfController }