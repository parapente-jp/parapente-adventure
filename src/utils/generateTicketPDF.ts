'use client';

import jsPDF from 'jspdf';
import QRCode from 'qrcode';

interface TicketData {
    id: string;
    formula: string;
    options: string[];
    price: number;
    customerName: string;
    createdAt: string;
    validUntil: string;
}

export async function generateTicketPDF(ticket: TicketData): Promise<void> {
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
    pdf.rect(0, 0, pageWidth, 40, 'F');

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PARAPENTE ADVENTURE', pageWidth / 2, 18, { align: 'center' });
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Bon Cadeau / Billet de Vol', pageWidth / 2, 30, { align: 'center' });

    // Ticket ID
    pdf.setFillColor(51, 51, 51);
    pdf.roundedRect(pageWidth / 2 - 30, 45, 60, 12, 3, 3, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(ticket.id, pageWidth / 2, 53, { align: 'center' });

    // Generate QR Code
    const qrDataUrl = await QRCode.toDataURL(ticket.id, {
        width: 400,
        margin: 2,
        color: { dark: '#333333', light: '#ffffff' }
    });

    // QR Code centered
    const qrSize = 50;
    pdf.addImage(qrDataUrl, 'PNG', (pageWidth - qrSize) / 2, 65, qrSize, qrSize);

    // Scan instruction
    pdf.setTextColor(150, 150, 150);
    pdf.setFontSize(10);
    pdf.text('Présentez ce QR code le jour du vol', pageWidth / 2, 122, { align: 'center' });

    // Divider
    pdf.setDrawColor(230, 230, 230);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 130, pageWidth - margin, 130);

    // Details section
    let yPos = 145;

    pdf.setTextColor(51, 51, 51);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DÉTAILS DU VOL', margin, yPos);
    yPos += 12;

    // Formula
    pdf.setFillColor(255, 245, 235);
    pdf.roundedRect(margin, yPos, contentWidth, 25, 3, 3, 'F');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 102, 0);
    pdf.text(ticket.formula, pageWidth / 2, yPos + 16, { align: 'center' });
    yPos += 35;

    // Options
    if (ticket.options && ticket.options.length > 0) {
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(11);
        pdf.text('Options incluses :', margin, yPos);
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
        { label: 'Bénéficiaire', value: ticket.customerName },
        { label: 'Prix payé', value: `${ticket.price} €` },
        { label: 'Date d\'achat', value: new Date(ticket.createdAt).toLocaleDateString('fr-FR') },
        { label: 'Valable jusqu\'au', value: new Date(ticket.validUntil).toLocaleDateString('fr-FR') }
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
        yPos += 18;
    });

    // Warning box
    yPos += 5;
    pdf.setFillColor(255, 243, 205);
    pdf.setDrawColor(255, 193, 7);
    pdf.setLineWidth(1);
    pdf.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'FD');

    pdf.setTextColor(133, 100, 4);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('⚠️ IMPORTANT', margin + 5, yPos + 10);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const warningText = 'Ce billet ne constitue pas une réservation de date. Appelez Jean-Philippe pour convenir de votre date de vol :';
    pdf.text(warningText, margin + 5, yPos + 18, { maxWidth: contentWidth - 10 });
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('📞 06 83 03 63 44', margin + 5, yPos + 30);

    // Footer
    pdf.setFillColor(51, 51, 51);
    pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('www.jpparapente05.fr | Orcières Merlette - Champsaur - Hautes-Alpes', pageWidth / 2, pageHeight - 8, { align: 'center' });

    // Download
    pdf.save(`billet-parapente-${ticket.id}.pdf`);
}
