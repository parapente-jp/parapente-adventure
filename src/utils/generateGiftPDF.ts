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

    // === RICH BACKGROUND ===
    // Base warm cream
    pdf.setFillColor(255, 252, 247);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Subtle warm gradient overlay at top
    for (let i = 0; i < 60; i++) {
        const alpha = 1 - (i / 60);
        const r = Math.round(255 - alpha * 10);
        const g = Math.round(252 - alpha * 30);
        const b = Math.round(247 - alpha * 60);
        pdf.setFillColor(r, g, b);
        pdf.rect(0, i * 1, pageWidth, 1.2, 'F');
    }

    // Subtle gradient at bottom
    for (let i = 0; i < 40; i++) {
        const alpha = i / 40;
        const r = Math.round(255 - alpha * 15);
        const g = Math.round(252 - alpha * 25);
        const b = Math.round(247 - alpha * 40);
        pdf.setFillColor(r, g, b);
        pdf.rect(0, pageHeight - 40 + i, pageWidth, 1.2, 'F');
    }

    // === DOUBLE DECORATIVE BORDER ===
    // Outer golden border
    pdf.setDrawColor(212, 160, 60);
    pdf.setLineWidth(2.5);
    pdf.roundedRect(6, 6, pageWidth - 12, pageHeight - 12, 4, 4);

    // Inner thin border
    pdf.setDrawColor(230, 190, 100);
    pdf.setLineWidth(0.8);
    pdf.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 3, 3);

    // === DECORATIVE CORNER STARS ===
    const drawStar = (cx: number, cy: number, size: number) => {
        pdf.setFillColor(212, 160, 60);
        // Simple diamond/star shape
        pdf.triangle(cx, cy - size, cx + size * 0.35, cy, cx, cy + size, 'F');
        pdf.triangle(cx, cy - size, cx - size * 0.35, cy, cx, cy + size, 'F');
        pdf.triangle(cx - size, cy, cx, cy - size * 0.35, cx + size, cy, 'F');
        pdf.triangle(cx - size, cy, cx, cy + size * 0.35, cx + size, cy, 'F');
    };

    drawStar(20, 20, 4);
    drawStar(pageWidth - 20, 20, 4);
    drawStar(20, pageHeight - 20, 4);
    drawStar(pageWidth - 20, pageHeight - 20, 4);

    // Small dots near corners
    pdf.setFillColor(230, 190, 100);
    const dotPositions = [
        { x: 28, y: 16 }, { x: 16, y: 28 },
        { x: pageWidth - 28, y: 16 }, { x: pageWidth - 16, y: 28 },
        { x: 28, y: pageHeight - 16 }, { x: 16, y: pageHeight - 28 },
        { x: pageWidth - 28, y: pageHeight - 16 }, { x: pageWidth - 16, y: pageHeight - 28 },
    ];
    dotPositions.forEach(d => pdf.circle(d.x, d.y, 1, 'F'));

    // === PARAGLIDING ILLUSTRATIONS ===

    // -- Mountain range silhouette (bottom area, behind content) --
    pdf.setFillColor(240, 232, 215);
    // Mountain 1 (left)
    pdf.triangle(12, pageHeight - 45, 55, pageHeight - 85, 98, pageHeight - 45, 'F');
    // Mountain 2 (center-left)
    pdf.triangle(60, pageHeight - 45, 110, pageHeight - 95, 160, pageHeight - 45, 'F');
    // Mountain 3 (center)
    pdf.triangle(130, pageHeight - 45, 175, pageHeight - 80, 220, pageHeight - 45, 'F');
    // Mountain 4 (right)
    pdf.setFillColor(235, 225, 205);
    pdf.triangle(190, pageHeight - 45, 230, pageHeight - 90, pageWidth - 12, pageHeight - 45, 'F');
    // Snow caps
    pdf.setFillColor(255, 252, 245);
    pdf.triangle(105, pageHeight - 92, 110, pageHeight - 95, 115, pageHeight - 92, 'F');
    pdf.triangle(170, pageHeight - 77, 175, pageHeight - 80, 180, pageHeight - 77, 'F');
    pdf.triangle(225, pageHeight - 87, 230, pageHeight - 90, 235, pageHeight - 87, 'F');

    // === TOP BANNER ===
    // Elegant gradient-like banner
    pdf.setFillColor(45, 45, 55);
    pdf.roundedRect(25, 15, pageWidth - 50, 22, 3, 3, 'F');

    // Gold accent line on top of banner
    pdf.setDrawColor(212, 160, 60);
    pdf.setLineWidth(1.5);
    pdf.line(25, 15, pageWidth - 25, 15);

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PARAPENTE ADVENTURE', pageWidth / 2, 25, { align: 'center' });

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(200, 200, 210);
    pdf.text('Orcieres Merlette  -  Champsaur  -  Hautes-Alpes', pageWidth / 2, 32, { align: 'center' });

    // === MAIN TITLE ===
    const titleY = 56;

    // Decorative line above title
    pdf.setDrawColor(212, 160, 60);
    pdf.setLineWidth(0.8);
    const lineW = 50;
    pdf.line(pageWidth / 2 - lineW - 10, titleY - 14, pageWidth / 2 - 10, titleY - 14);
    pdf.line(pageWidth / 2 + 10, titleY - 14, pageWidth / 2 + lineW + 10, titleY - 14);

    // Small diamond between lines
    drawStar(pageWidth / 2, titleY - 14, 2.5);

    // BON CADEAU title
    pdf.setTextColor(212, 160, 60);
    pdf.setFontSize(38);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.mainTitle, pageWidth / 2, titleY + 2, { align: 'center' });

    // Decorative line below title
    pdf.line(pageWidth / 2 - lineW - 10, titleY + 7, pageWidth / 2 - 10, titleY + 7);
    pdf.line(pageWidth / 2 + 10, titleY + 7, pageWidth / 2 + lineW + 10, titleY + 7);
    drawStar(pageWidth / 2, titleY + 7, 2.5);

    // === SUBTITLE ===
    pdf.setTextColor(120, 110, 90);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    pdf.text(t.subtitle, pageWidth / 2, titleY + 17, { align: 'center' });

    // === FORMULA CARD ===
    const formulaY = titleY + 28;
    // Card background
    pdf.setFillColor(45, 45, 55);
    pdf.roundedRect(pageWidth / 2 - 65, formulaY - 7, 130, 18, 3, 3, 'F');

    // Gold accent
    pdf.setDrawColor(212, 160, 60);
    pdf.setLineWidth(0.8);
    pdf.roundedRect(pageWidth / 2 - 65, formulaY - 7, 130, 18, 3, 3);

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(gift.formulaName, pageWidth / 2, formulaY + 5, { align: 'center' });

    // === OPTIONS ===
    let currentY = formulaY + 18;
    if (gift.options && gift.options.length > 0) {
        pdf.setTextColor(140, 130, 110);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const optionsStr = `${t.includedOptions} ${gift.options.join(', ')}`;
        pdf.text(optionsStr, pageWidth / 2, currentY, { align: 'center' });
        currentY += 8;
    } else {
        currentY += 4;
    }

    // === TWO COLUMNS ===
    const colY = currentY + 2;
    const leftColX = 35;
    const rightColX = pageWidth / 2 + 25;

    // --- LEFT COLUMN: Form fields ---
    pdf.setTextColor(80, 75, 65);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');

    // "Offert par" field
    pdf.text(t.offeredBy, leftColX, colY);
    pdf.setDrawColor(200, 190, 170);
    pdf.setLineWidth(0.3);
    pdf.line(leftColX + 2, colY + 8, leftColX + 120, colY + 8);

    // "Pour" field
    pdf.text(t.forRecipient, leftColX, colY + 20);
    pdf.line(leftColX + 2, colY + 28, leftColX + 120, colY + 28);

    // "Message" field
    pdf.text(t.personalMessage, leftColX, colY + 40);
    pdf.line(leftColX + 2, colY + 48, leftColX + 120, colY + 48);
    pdf.line(leftColX + 2, colY + 56, leftColX + 120, colY + 56);

    // --- RIGHT COLUMN: QR Code + Info ---
    // QR Code
    const qrDataUrl = await QRCode.toDataURL('https://www.jpparapente05.fr', {
        width: 300,
        margin: 2,
        color: { dark: '#2D2D37', light: '#ffffff' }
    });
    const qrSize = 30;
    pdf.addImage(qrDataUrl, 'PNG', rightColX + 20, colY - 2, qrSize, qrSize);

    pdf.setTextColor(160, 150, 130);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text('www.jpparapente05.fr', rightColX + 35, colY + 32, { align: 'center' });

    // Validity
    if (gift.validUntil) {
        pdf.setTextColor(100, 95, 80);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${t.validUntil} : ${new Date(gift.validUntil).toLocaleDateString(locale)}`, rightColX + 35, colY + 42, { align: 'center' });
    }

    // Reference
    if (gift.ticketId) {
        pdf.setTextColor(160, 150, 130);
        pdf.setFontSize(8);
        pdf.text(`Ref : ${gift.ticketId}`, rightColX + 35, colY + 49, { align: 'center' });
    }

    // === BOTTOM BOOKING INFO ===
    const bottomY = pageHeight - 34;

    pdf.setFillColor(45, 45, 55);
    pdf.roundedRect(25, bottomY - 5, pageWidth - 50, 18, 3, 3, 'F');

    // Gold line accent
    pdf.setDrawColor(212, 160, 60);
    pdf.setLineWidth(0.5);
    pdf.line(25, bottomY - 5, pageWidth - 25, bottomY - 5);

    pdf.setTextColor(212, 160, 60);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.howToBook, pageWidth / 2, bottomY + 3, { align: 'center' });

    pdf.setTextColor(200, 200, 210);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(t.howToBookText, pageWidth / 2, bottomY + 9, { align: 'center' });

    // === FOOTER ===
    pdf.setTextColor(160, 150, 130);
    pdf.setFontSize(7);
    pdf.text('06 83 03 63 44  |  jeanraza@hotmail.fr  |  www.jpparapente05.fr', pageWidth / 2, pageHeight - 12, { align: 'center' });

    // === DOWNLOAD ===
    pdf.save(`bon-cadeau-parapente-${gift.ticketId || 'adventure'}.pdf`);
}
