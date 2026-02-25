import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { Language, translations as allTranslations } from '@/data/translations';

interface GiftData {
    formulaName: string;
    options: string[];
    price: number;
    ticketId?: string;
    validUntil?: string;
}

export async function generateGiftPDF(gift: GiftData, language: Language = 'fr'): Promise<void> {
    const t = allTranslations[language].giftPdf;
    const locale = language === 'fr' ? 'fr-FR' : 'en-GB';

    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // === BACKGROUND ===
    pdf.setFillColor(255, 250, 245);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // === DECORATIVE BORDER ===
    // Outer border
    pdf.setDrawColor(255, 102, 0);
    pdf.setLineWidth(3);
    pdf.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 5, 5);

    // Inner border (thin)
    pdf.setDrawColor(255, 178, 102);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(12, 12, pageWidth - 24, pageHeight - 24, 3, 3);

    // === DECORATIVE CORNER ELEMENTS ===
    const cornerSize = 15;
    const corners = [
        { x: 16, y: 16 },
        { x: pageWidth - 16 - cornerSize, y: 16 },
        { x: 16, y: pageHeight - 16 - cornerSize },
        { x: pageWidth - 16 - cornerSize, y: pageHeight - 16 - cornerSize }
    ];

    pdf.setDrawColor(255, 140, 50);
    pdf.setLineWidth(1);
    corners.forEach(c => {
        // Small decorative L shapes
        pdf.line(c.x, c.y, c.x + cornerSize * 0.4, c.y);
        pdf.line(c.x, c.y, c.x, c.y + cornerSize * 0.4);
        pdf.line(c.x + cornerSize, c.y, c.x + cornerSize * 0.6, c.y);
        pdf.line(c.x + cornerSize, c.y, c.x + cornerSize, c.y + cornerSize * 0.4);
        pdf.line(c.x, c.y + cornerSize, c.x + cornerSize * 0.4, c.y + cornerSize);
        pdf.line(c.x, c.y + cornerSize, c.x, c.y + cornerSize * 0.6);
        pdf.line(c.x + cornerSize, c.y + cornerSize, c.x + cornerSize * 0.6, c.y + cornerSize);
        pdf.line(c.x + cornerSize, c.y + cornerSize, c.x + cornerSize, c.y + cornerSize * 0.6);
    });

    // === TOP HEADER ===
    pdf.setFillColor(255, 102, 0);
    pdf.roundedRect(20, 18, pageWidth - 40, 28, 4, 4, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('PARAPENTE ADVENTURE', pageWidth / 2, 28, { align: 'center' });

    pdf.setFontSize(9);
    pdf.text('Orcières Merlette • Champsaur • Hautes-Alpes', pageWidth / 2, 36, { align: 'center' });

    // === MAIN TITLE: BON CADEAU ===
    const titleY = 60;
    pdf.setTextColor(255, 102, 0);
    pdf.setFontSize(42);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.mainTitle, pageWidth / 2, titleY, { align: 'center' });

    // Decorative line under title
    pdf.setDrawColor(255, 140, 50);
    pdf.setLineWidth(1.5);
    const lineWidth = 80;
    pdf.line(pageWidth / 2 - lineWidth / 2, titleY + 4, pageWidth / 2 + lineWidth / 2, titleY + 4);

    // Small diamond in center of line
    const dX = pageWidth / 2;
    const dY = titleY + 4;
    pdf.setFillColor(255, 102, 0);
    pdf.triangle(dX, dY - 2.5, dX + 2.5, dY, dX, dY + 2.5, 'F');
    pdf.triangle(dX, dY - 2.5, dX - 2.5, dY, dX, dY + 2.5, 'F');

    // === SUBTITLE ===
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'italic');
    pdf.text(t.subtitle, pageWidth / 2, titleY + 14, { align: 'center' });

    // === FORMULA NAME ===
    const formulaY = titleY + 30;
    pdf.setFillColor(255, 245, 235);
    pdf.setDrawColor(255, 178, 102);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(pageWidth / 2 - 70, formulaY - 8, 140, 18, 4, 4, 'FD');

    pdf.setTextColor(51, 51, 51);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(gift.formulaName, pageWidth / 2, formulaY + 4, { align: 'center' });

    // === OPTIONS ===
    if (gift.options && gift.options.length > 0) {
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const optionsStr = `${t.includedOptions} ${gift.options.join(', ')}`;
        pdf.text(optionsStr, pageWidth / 2, formulaY + 16, { align: 'center' });
    }

    // === TWO COLUMNS: LEFT (Gift fields) | RIGHT (QR + Info) ===
    const colY = formulaY + 28;
    const leftColX = 40;
    const rightColX = pageWidth / 2 + 20;

    // --- LEFT COLUMN: Gift fields ---
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');

    // "Offert par" field
    pdf.text(t.offeredBy, leftColX, colY);
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(leftColX + 2, colY + 8, leftColX + 110, colY + 8);

    // "Pour" field
    pdf.text(t.forRecipient, leftColX, colY + 22);
    pdf.line(leftColX + 2, colY + 30, leftColX + 110, colY + 30);

    // "Message" field
    pdf.text(t.personalMessage, leftColX, colY + 44);
    pdf.line(leftColX + 2, colY + 52, leftColX + 110, colY + 52);
    pdf.line(leftColX + 2, colY + 60, leftColX + 110, colY + 60);

    // --- RIGHT COLUMN: QR Code + Info ---
    // QR Code
    const qrDataUrl = await QRCode.toDataURL('https://www.jpparapente05.fr', {
        width: 300,
        margin: 2,
        color: { dark: '#FF6600', light: '#ffffff' }
    });
    const qrSize = 30;
    pdf.addImage(qrDataUrl, 'PNG', rightColX + 20, colY - 5, qrSize, qrSize);

    pdf.setTextColor(150, 150, 150);
    pdf.setFontSize(8);
    pdf.text('www.jpparapente05.fr', rightColX + 20 + qrSize / 2, colY + qrSize, { align: 'center' });

    // Value & Validity
    pdf.setTextColor(51, 51, 51);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${t.value} : ${gift.price}€`, rightColX, colY + 40);

    if (gift.validUntil) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.text(`${t.validUntil} : ${new Date(gift.validUntil).toLocaleDateString(locale)}`, rightColX, colY + 48);
    }

    if (gift.ticketId) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Réf : ${gift.ticketId}`, rightColX, colY + 56);
    }

    // === BOTTOM: Instructions ===
    const bottomY = pageHeight - 38;

    pdf.setFillColor(255, 243, 205);
    pdf.setDrawColor(255, 193, 7);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(25, bottomY - 6, pageWidth - 50, 20, 3, 3, 'FD');

    pdf.setTextColor(133, 100, 4);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`📞 ${t.howToBook}`, pageWidth / 2, bottomY + 2, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(t.howToBookText, pageWidth / 2, bottomY + 9, { align: 'center' });

    // === FOOTER ===
    pdf.setFillColor(51, 51, 51);
    pdf.roundedRect(20, pageHeight - 16, pageWidth - 40, 10, 0, 0, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.text('06 83 03 63 44 • jeanraza@hotmail.fr • www.jpparapente05.fr', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // === DOWNLOAD ===
    pdf.save(`bon-cadeau-parapente-${gift.ticketId || 'adventure'}.pdf`);
}
