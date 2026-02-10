import { Language, translations as allTranslations } from '@/data/translations';

interface TicketData {
    id: string;
    formula: string;
    options: string[];
    price: number;
    customerName: string;
    createdAt: string;
    validUntil: string;
}

export async function generateTicketPDF(ticket: TicketData, language: Language = 'fr'): Promise<void> {
    const t = allTranslations[language].pdf;
    const locale = language === 'fr' ? 'fr-FR' : 'en-GB';

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Background gradient simulation with rectangles
    pdf.setFillColor(255, 250, 245);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header bar
    pdf.setFillColor(255, 102, 0);
    pdf.rect(0, 0, pageWidth, 35, 'F');

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PARAPENTE ADVENTURE', pageWidth / 2, 15, { align: 'center' });
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(t.title, pageWidth / 2, 25, { align: 'center' });

    // Ticket ID
    pdf.setFillColor(51, 51, 51);
    pdf.roundedRect(pageWidth / 2 - 30, 40, 60, 10, 3, 3, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(ticket.id, pageWidth / 2, 47, { align: 'center' });

    // Generate QR Code
    const qrDataUrl = await QRCode.toDataURL(ticket.id, {
        width: 400,
        margin: 2,
        color: { dark: '#333333', light: '#ffffff' }
    });

    // QR Code centered
    const qrSize = 45;
    pdf.addImage(qrDataUrl, 'PNG', (pageWidth - qrSize) / 2, 58, qrSize, qrSize);

    // Scan instruction
    pdf.setTextColor(150, 150, 150);
    pdf.setFontSize(10);
    pdf.text(t.scanInstruction, pageWidth / 2, 110, { align: 'center' });

    // Divider
    pdf.setDrawColor(230, 230, 230);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 118, pageWidth - margin, 118);

    // Details section
    let yPos = 130;

    pdf.setTextColor(51, 51, 51);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.flightDetails, margin, yPos);
    yPos += 12;

    // Formula
    pdf.setFillColor(255, 245, 235);
    pdf.roundedRect(margin, yPos, contentWidth, 20, 3, 3, 'F');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 102, 0);
    pdf.text(ticket.formula, pageWidth / 2, yPos + 13, { align: 'center' });
    yPos += 30;

    // Options
    if (ticket.options && ticket.options.length > 0) {
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(11);
        pdf.text(t.includedOptions, margin, yPos);
        yPos += 7;
        pdf.setTextColor(51, 51, 51);
        ticket.options.forEach(opt => {
            pdf.text(`• ${opt}`, margin + 5, yPos);
            yPos += 6;
        });
        yPos += 5;
    }

    // Info grid
    const infoItems = [
        { label: t.beneficiary, value: ticket.customerName },
        { label: t.pricePaid, value: `${ticket.price} €` },
        { label: t.purchaseDate, value: new Date(ticket.createdAt).toLocaleDateString(locale) },
        { label: t.validUntil, value: new Date(ticket.validUntil).toLocaleDateString(locale) }
    ];

    infoItems.forEach(item => {
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(10);
        pdf.text(item.label, margin, yPos);
        pdf.setTextColor(51, 51, 51);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(item.value, margin, yPos + 6);
        pdf.setFont('helvetica', 'normal');
        yPos += 15;
    });

    // Warning box
    yPos += 2;
    pdf.setFillColor(255, 243, 205);
    pdf.setDrawColor(255, 193, 7);
    pdf.setLineWidth(1);
    pdf.roundedRect(margin, yPos, contentWidth, 30, 3, 3, 'FD');

    // Draw warning triangle manually
    pdf.setDrawColor(133, 100, 4);
    pdf.setLineWidth(0.5);
    const triX = margin + 5;
    const triY = yPos + 8;
    pdf.line(triX, triY, triX - 2, triY + 4);
    pdf.line(triX, triY, triX + 2, triY + 4);
    pdf.line(triX - 2, triY + 4, triX + 2, triY + 4);
    pdf.setFontSize(5);
    pdf.text('!', triX, triY + 3.2, { align: 'center' });

    pdf.setTextColor(133, 100, 4);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.important, margin + 9, yPos + 8);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(t.warningText, margin + 5, yPos + 16, { maxWidth: contentWidth - 10 });
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(t.phone, margin + 5, yPos + 26);

    // Footer
    pdf.setFillColor(51, 51, 51);
    const footerHeight = 15;
    pdf.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('www.jpparapente05.fr | Orcières Merlette - Champsaur - Hautes-Alpes', pageWidth / 2, pageHeight - 6, { align: 'center' });

    // Download
    pdf.save(`billet-parapente-${ticket.id}.pdf`);
}
