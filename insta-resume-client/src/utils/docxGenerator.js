import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, Packer } from 'docx';
import { saveAs } from 'file-saver';

export const generateDocx = async (formData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with contact info in three columns
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          rows: [
            new TableRow({
              children: [
                // Left column (Phone & Email)
                // new TableCell({
                //   borders: { all: { style: BorderStyle.NONE } },
                //   children: [
                //     new Paragraph({ text: "(Phone)", style: { color: "#666666" } }),
                //     new Paragraph({ text: formData.personalInfo.phone || '' }),
                //     new Paragraph({ text: "(Email)", style: { color: "#666666" } }),
                //     new Paragraph({ text: formData.personalInfo.email || '' })
                //   ]
                // }),

                new TableCell({
                  borders: { all: { style: BorderStyle.NONE } },
                  children: [
                    new Paragraph({ 
                      text: `${formData.personalInfo.phone || 'Phone'}`,
                      style: { color: "#666666" }
                    }),
                    new Paragraph({ 
                      text: `${formData.personalInfo.email || 'Email'}`,
                      style: { color: "#666666" }
                    })
                  ]
                }),
                // Center column (Name & Title)
                new TableCell({
                  borders: { all: { style: BorderStyle.NONE } },
                  children: [
                    new Paragraph({
                      text: formData.personalInfo.name || 'Your Name',
                      alignment: AlignmentType.CENTER,
                      heading: HeadingLevel.HEADING_1,
                      style: { bold: true }
                    }),
                    new Paragraph({
                      text: `${formData.personalInfo.title || 'Professional Title'} | ${formData.personalInfo.location || 'Location'}`,
                      alignment: AlignmentType.CENTER,
                      style: { color: "#666666" }
                    })
                  ]
                }),
                // Right column (URLs)
                new TableCell({
                  borders: { all: { style: BorderStyle.NONE } },
                  children: [
                    new Paragraph({ text: "(URL)", style: { color: "#666666" } }),
                    ...formData.personalInfo.urls.map(url => 
                      new Paragraph({ 
                        text: `${url.type}: ${url.url}`,
                        alignment: AlignmentType.RIGHT
                      })
                    )
                  ]
                })
              ]
            })
          ]
        }),

        // Summary Section (if exists)
        ...(formData.personalInfo.summary ? [
          new Paragraph({
            text: "SUMMARY",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({ text: formData.personalInfo.summary })
        ] : []),

        // Experience Section (if exists)
        ...(formData.experience.length > 0 ? [
          new Paragraph({
            text: "RELEVANT EXPERIENCE",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
            spacing: { before: 400, after: 200 }
          }),
          ...formData.experience.flatMap(exp => [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: { all: { style: BorderStyle.NONE } },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({ text: exp.company, bold: true }),
                        new Paragraph({ text: exp.title, style: { italic: true } })
                      ]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ 
                          text: exp.location,
                          alignment: AlignmentType.RIGHT
                        }),
                        new Paragraph({ 
                          text: exp.date,
                          alignment: AlignmentType.RIGHT
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            ...exp.responsibilities.map(resp => 
              new Paragraph({
                text: `• ${resp}`,
                spacing: { before: 100 }
              })
            )
          ])
        ] : []),

        // Education Section (if exists)
        ...(formData.education.school ? [
          new Paragraph({
            text: "EDUCATION",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
            spacing: { before: 400, after: 200 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { all: { style: BorderStyle.NONE } },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ text: formData.education.school, bold: true }),
                      new Paragraph({ text: formData.education.degree }),
                      ...(formData.education.gpa ? [
                        new Paragraph({ text: `GPA: ${formData.education.gpa}` })
                      ] : [])
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ 
                        text: formData.education.date,
                        alignment: AlignmentType.RIGHT
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ] : []),

        // Skills Section (if exists)
        ...(formData.skills.length > 0 ? [
          new Paragraph({
            text: "SKILLS",
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({ text: formData.skills.join(' • ') })
        ] : [])
      ]
    }]
  });

  // Generate and save document
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${formData.personalInfo.name.replace(/\s+/g, '_')}_Resume.docx`);
}; 