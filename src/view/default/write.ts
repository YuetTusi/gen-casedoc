export const writeDoc = async () => {

    // const { validateFields } = formRef;
    // try {
    //     const values = await validateFields();

    //     const { filePaths } = await ipcRenderer.invoke('show-open-dialog', { properties: ['openDirectory'] });

    //     if (filePaths.length === 0) {
    //         return;
    //     }
    //     setReading(true);
    //     // const eviRow = new TableRow({
    //     //     children: [
    //     //         new TableCell({
    //     //             children: [
    //     //                 DocText.fangsong('委托物品初检情况')
    //     //             ],
    //     //             rowSpan: values.evidences.length * 3
    //     //         }),
    //     //         ...[
    //     //         ]
    //     //     ],
    //     // });

    //     const doc = new Document({
    //         sections: [{
    //             headers: {
    //                 default: new Header({
    //                     children: [new Paragraph(`档案编号：${values.docNo}`)]
    //                 })
    //             },
    //             children: [
    //                 DocText.p([
    //                     DocText.hei('北京国盾信息中心司法鉴定所委托鉴定物品初步检查情况确认表')
    //                 ], AlignmentType.CENTER),
    //                 DocText.p([
    //                     DocText.fangsong(`档案编号：${values.docNo}`)
    //                 ], AlignmentType.RIGHT),
    //                 new Table({
    //                     width: { size: 9050, type: WidthType.DXA },
    //                     rows: [
    //                         new TableRow({
    //                             children: [
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong('检查时间')
    //                                         ])
    //                                     ],
    //                                     columnSpan: 2
    //                                 }),
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong(values.checkTime)
    //                                         ])
    //                                     ],
    //                                     columnSpan: 5
    //                                 })
    //                             ]
    //                         }),
    //                         new TableRow({
    //                             children: [
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong('委托单位')
    //                                         ])
    //                                     ],
    //                                     columnSpan: 2
    //                                 }),
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong(values.client)
    //                                         ])
    //                                     ],
    //                                     columnSpan: 5
    //                                 })
    //                             ]
    //                         }),
    //                         new TableRow({
    //                             children: [
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong('案件名称')
    //                                         ])
    //                                     ],
    //                                     columnSpan: 2
    //                                 }),
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong(values.caseName)
    //                                         ])
    //                                     ],
    //                                     columnSpan: 5
    //                                 })
    //                             ]
    //                         }),
    //                         new TableRow({
    //                             children: [
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong('其它须说明的情况')
    //                                         ])
    //                                     ],
    //                                     columnSpan: 2
    //                                 }),
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong(values.others)
    //                                         ])
    //                                     ],
    //                                     columnSpan: 5
    //                                 })
    //                             ]
    //                         }),
    //                         new TableRow({
    //                             children: [
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong('初查人签名')
    //                                         ])
    //                                     ],
    //                                     columnSpan: 2
    //                                 }),
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong(values.sign1)
    //                                         ])
    //                                     ],
    //                                     columnSpan: 2
    //                                 }),
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong('委托经手人签名')
    //                                         ])
    //                                     ],
    //                                     columnSpan: 2
    //                                 }),
    //                                 new TableCell({
    //                                     children: [
    //                                         DocText.p([
    //                                             DocText.fangsong(values.sign2)
    //                                         ])
    //                                     ]
    //                                 })
    //                             ]
    //                         }),
    //                     ]
    //                 })
    //             ]
    //         }],
    //     });

    //     const chunk = await Packer.toBuffer(doc);

    //     const savePath = path.join(filePaths[0], '委托书测试.docx');
    //     fs.writeFileSync(savePath, chunk);
    //     message.success('生成成功');
    //     shell.openPath(savePath);
    // } catch (error) {
    //     console.warn(error);
    // } finally {
    //     setReading(false);
    // }
};