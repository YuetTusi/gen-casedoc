import fs from 'fs';
import { Document, Paragraph, TextRun, Packer } from 'docx';

function App() {



  return (
    <div className="App">
      Generat Case Doc.
      <hr />
      <button type="button" onClick={() => {

        const doc = new Document({
          sections: [
            {
              // properties: {},
              children: [
                new Paragraph({
                  children: [
                    new TextRun("Hello World"),
                    new TextRun({
                      text: "Foo Bar",
                      bold: true,
                    }),
                    new TextRun({
                      text: "\tGithub is the best",
                      bold: true,
                    }),
                  ],
                }),
              ],
            },
          ],
        });

        Packer.toBuffer(doc).then(buf => {
          fs.writeFileSync('demo.doc', buf);
        });
      }}>Write</button>
    </div>
  )
}

export default App
