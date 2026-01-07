import { Table } from "antd";
import { useGetBookList } from "src/hook/useBook";

export default function BookPage() {
  const { bookList, refetch } = useGetBookList();
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "isbn",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "publication year",
      dataIndex: "publication_year",
      key: "publication_year",
    },
  ];
  return (
    <>
      <Table dataSource={[]} columns={columns} />;
    </>
  );
}
