import DocView from '../components/doc-view'

async function PagePDF({ params: { pdf } }: { params: { pdf: string } }) {
  return <DocView pdf={pdf} />
}
export default PagePDF
