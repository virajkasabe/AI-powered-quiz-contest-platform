import Intern from "../models/intern.js";
import Contest from '../models/contests.js'
import xlsx from 'xlsx'

const uploadInterns = async (req, res) => {
    try {
        // req.file is provided by multer (file upload middleware)
        if (!req.file) {
            return res.status(400).json({ message: '❌ No file uploaded.' });
        }

        // Read the uploaded Excel file from memory
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];        // first sheet
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet); // convert to array of objects

        if (rows.length === 0) {
            return res.status(400).json({ message: '❌ Excel file is empty.' });
        }

        let added = 0;
        let skipped = 0;

        for (const row of rows) {
            // Check if intern with this uniqueId already exists
            const exists = await Intern.findOne({ uniqueId: row.uniqueId });

            if (exists) {
                skipped++;
                continue; // skip duplicates
            }

            // Create new intern record
            await Intern.create({
                uniqueId: row.uniqueId,
                name: row.name,
                email: row.email,
                domain: row.domain,
                joiningDate: new Date(row.joiningDate),
                status: row.status || 'Active'
            });

            added++;
        }

        res.json({
            message: `✅ Upload complete. Added: ${added}, Skipped (duplicates): ${skipped}`
        });

    } catch (error) {
        res.status(500).json({ message: '❌ Server error.', error: error.message });
    }
};


// ─────────────────────────────────────────
// 4. CREATE A CONTEST
// POST /admin/create-contest
// ─────────────────────────────────────────
export const createContest = async (req, res) => {
    try {
        let { date, domains, startTime, endTime } = req.body;

        // Validate required fields
        if (!date || !domains || !startTime || !endTime) {
            return res.status(400).json({ message: '❌ All fields are required.' });
        }

        // 🔥 Convert to string
        const datePart = new Date(date).toISOString().split("T")[0];

        const startDateTime = new Date(`${datePart}T${startTime}:00`);
        const endDateTime = new Date(`${datePart}T${endTime}:00`);

        // If domains is array → convert to string
        if (Array.isArray(domains)) {
            domains = domains.join(","); // "web,ai,app"
        } else {
            domains = String(domains);
        }

        // Check if contest already exists
        const existing = await Contest.findOne({ date });
        if (existing) {
            return res.status(400).json({ message: '❌ Contest already exists for this date.' });
        }

        const contest = await Contest.create({
            date: new Date(date),
            domains,
            startTime: startDateTime,
            endTime: endDateTime
        });

        res.status(201).json({
            message: '✅ Contest created successfully.',
            contest
        });

    } catch (error) {
        res.status(500).json({ message: '❌ Server error.', error: error.message });
    }
};

export default uploadInterns;

