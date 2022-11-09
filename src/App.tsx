import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom/client';
import localforage from 'localforage';
import { GlobalStyle } from './styled/global';
import { ConfigProvider, DatePicker, Empty } from 'antd';
import ViewRouter from '@/router';
import Reading from './component/reading';
import zhCN from 'antd/es/locale/zh_CN';
import dateLocale from 'antd/es/date-picker/locale/zh_CN';

import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';

moment.locale('zh-cn');

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL]
});

const $root = document.querySelector('#root')!;

ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <ConfigProvider
      componentSize="small"
      locale={zhCN}
      renderEmpty={() =>
        <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }>
      <DatePicker locale={dateLocale} />
      <ViewRouter />
      <Reading />
    </ConfigProvider>
    <GlobalStyle />
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