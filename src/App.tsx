import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, Empty } from 'antd';
import ViewRouter from '@/router';
import 'antd/dist/antd.less';

const $root = document.querySelector('#root')!;

ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <ConfigProvider
      componentSize="small"
      renderEmpty={() =>
        <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }>
      <ViewRouter />
    </ConfigProvider>
  </React.StrictMode>
);


// const App: FC<{}> = () => <div className="App">
//   Generat Case Doc.
//   <hr />
//   <button type="button" onClick={() => {

//     const doc = new Document({
//       sections: [
//         {
//           // properties: {},
//           children: [
//             new Paragraph({
//               children: [
//                 new TextRun("Hello World"),
//                 new TextRun({
//                   text: "Foo Bar",
//                   bold: true,
//                 }),
//                 new TextRun({
//                   text: "\tGithub is the best",
//                   bold: true,
//                 }),
//               ],
//             }),
//           ],
//         },
//       ],
//     });

//     Packer.toBuffer(doc).then(buf => {
//       fs.writeFileSync('demo.doc', buf);
//     });
//   }}>Write</button>
// </div>;