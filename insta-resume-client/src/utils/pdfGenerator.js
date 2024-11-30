import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (resumePreview) => {
  try {
    // Create a temporary container with exact styling from live preview
    const container = document.createElement('div');
    container.innerHTML = resumePreview;
    
    // Apply the same styles as live preview
    container.style.cssText = `
      font-family: Arial, sans-serif;
      width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
      background: white;
      color: black;
      position: fixed;
      top: 0;
      left: -9999px;
      box-sizing: border-box;
    `;

    // Add custom styles to ensure proper rendering
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      h1 { margin: 0; font-size: 24px; text-transform: uppercase; font-weight: bold; }
      h2 { text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px; }
      ul { margin: 5px 0; padding-left: 20px; }
      li { margin-bottom: 5px; }
      .section { margin-bottom: 20px; }
      .flex { display: flex; justify-content: space-between; }
      .bold { font-weight: bold; }
      .italic { font-style: italic; }
    `;
    container.appendChild(styleSheet);

    // Add to document
    document.body.appendChild(container);

    // Wait for fonts and images to load
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate canvas with high quality settings
    const canvas = await html2canvas(container, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 800,
      height: container.offsetHeight,
      windowWidth: 800,
      onclone: (clonedDoc) => {
        const clonedContainer = clonedDoc.querySelector('div');
        // Ensure proper rendering of flexbox and other styles
        clonedContainer.style.position = 'relative';
        clonedContainer.style.left = '0';
        clonedContainer.style.transform = 'none';
      }
    });

    // Create PDF with proper dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      hotfixes: ['px_scaling']
    });

    // Calculate dimensions to maintain aspect ratio
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const aspectRatio = canvas.height / canvas.width;
    const imgWidth = pageWidth;
    const imgHeight = pageWidth * aspectRatio;

    // Add pages if content is longer than one page
    let heightLeft = imgHeight;
    let position = 0;
    let page = 1;

    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      position,
      imgWidth,
      imgHeight,
      '',
      'FAST'
    );

    while (heightLeft >= pageHeight) {
      position = -pageHeight * page;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );
      heightLeft -= pageHeight;
      page++;
    }

    // Save with the person's name
    const name = document.querySelector('h1')?.textContent?.trim() || 'resume';
    pdf.save(`${name.replace(/\s+/g, '_')}.pdf`);

    // Cleanup
    document.body.removeChild(container);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}; 