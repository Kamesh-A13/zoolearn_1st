import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://zoolearn.in/about';
const OUTPUT_DIR = path.join(process.cwd(), 'team-qr-codes');

const teamMembers = [
    { id: 'Pranav-Karthik', name: 'Pranav Karthik' },
    { id: 'Vikram', name: 'Vikram' },
    { id: 'Thomas-Jeberson', name: 'Thomas Jeberson' },
    { id: 'Vijai-Sharathi', name: 'Vijai Sharathi' },
    { id: 'Kamesh', name: 'Kamesh' },
    { id: 'Charan', name: 'Charan' },
    { id: 'Satheeswaren', name: 'Satheeswaren' },
    { id: 'Vishnuputhiran', name: 'Vishnuputhiran' },
    { id: 'Ahmed-Safnas', name: 'Ahmed Safnas' },
    { id: 'Nethra-V', name: 'Nethra V' },
    { id: 'Javith-ahmed', name: 'Javith Ahmed' },
    { id: 'Srihari-varadhan', name: 'Srihari Varadhan' },
    { id: 'Boomani-Priyan', name: 'Boomani Priyan' },
    { id: 'Pavan-shankar', name: 'Pavan Shankar' },
    { id: 'Nishanth-M', name: 'Nishanth M' },
    { id: 'Khurab-F', name: 'Khurab F' },
    { id: 'Aslam-sheriff', name: 'Aslam Sheriff' },
    { id: 'Vijayakarthikmukilan', name: 'Vijayakarthikmukilan' },
    { id: 'Amirtharaj', name: 'Amirtharaj' },
];

async function generateQRCodes() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const member of teamMembers) {
        const url = `${BASE_URL}#${member.id}`;
        const filename = `${member.id}-qr.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        await QRCode.toFile(filepath, url, {
            width: 400,
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' },
            errorCorrectionLevel: 'H',
        });

        console.log(`✅ ${member.name}: ${filename} → ${url}`);
    }

    console.log(`\n🎉 All ${teamMembers.length} QR codes saved to: ${OUTPUT_DIR}`);
}

generateQRCodes();
