import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import AdmZip from 'adm-zip';

const execAsync = promisify(exec);

const ALLURE_URL = 'http://10.10.50.160:8080/api/result';
const HEADER = 'accept: */*';

async function uploadResults() {
    try {
        const resultsDir = path.join(process.cwd(), 'allure-results');
        const zipFile = 'allure-results.zip';

        // Check if allure-results directory exists
        if (!fs.existsSync(resultsDir)) {
            console.error('❌ No allure-results directory found. Please run tests first.');
            process.exit(1);
        }

        // Create zip file using adm-zip
        console.log('📦 Creating zip file...');
        const zip = new AdmZip();
        zip.addLocalFolder(resultsDir);
        zip.writeZip(zipFile);
        console.log('✅ Zip file created successfully');

        // Upload to Allure server
        console.log('📤 Uploading results to Allure server...');
        const curlCommand = `curl -X POST "${ALLURE_URL}" -H "${HEADER}" -F "allureResults=@${zipFile};type=application/x-zip-compressed"`;
        const { stdout, stderr } = await execAsync(curlCommand);

        if (stderr) {
            console.error('⚠️ Upload warning:', stderr);
        }

        console.log('✅ Upload response:', stdout);
        console.log('✅ Results uploaded successfully!');

        // Clean up zip file
        console.log('🧹 Cleaning up...');
        fs.unlinkSync(zipFile);
        console.log('✅ Cleanup completed');

    } catch (error) {
        if (error instanceof Error) {
            console.error('❌ Error:', error.message);
        } else {
            console.error('❌ An unknown error occurred:', error);
        }
        process.exit(1);
    }
}

uploadResults(); 