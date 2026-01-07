import { Table, Button, Row, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBorrowBook, useGetBookList, useReturnBook } from "src/hook/useBook";
import { confirmAlert } from "utils/dialogs";

export default function BookPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const { bookList, refetch } = useGetBookList({
    search,
  });
  const { submitBorrowBook } = useBorrowBook();
  const { submitReturnBook } = useReturnBook();

  const onSubmitBorrowBook = async (id: number) => {
    await confirmAlert({ text: "This book will be borrowed" }, async () => {
      await submitBorrowBook(id);
      refetch();
    });
  };

  const onSubmitReturnBook = async (id: number) => {
    await confirmAlert({ text: "This book will be return" }, async () => {
      await submitReturnBook(id);
      refetch();
    });
  };

  const onLogout = async () => {
    await confirmAlert({ text: "Are you sure to logout" }, async () => {
      localStorage.clear();
      window.location.reload();
    });
  };

  useEffect(() => {
    refetch();
  }, [search]);

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
    {
      title: "Action",
      dataIndex: "id",
      render: (value: any, record: any) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              onClick={() => {
                navigate(`/update/${value}`);
              }}
            >
              Edit
            </Button>
            {!record.users ? (
              <Button
                onClick={() => {
                  onSubmitBorrowBook(value);
                }}
                type="primary"
              >
                Borrow
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onSubmitReturnBook(value);
                }}
                type="primary"
                danger
              >
                Return
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="primary" onClick={() => navigate("/create")}>
          Create
        </Button>
        <Button type="primary" danger onClick={onLogout}>
          Logout
        </Button>
      </Row>
      <Row style={{ marginTop: "18px", marginBottom: "18px" }}>
        <Input
          placeholder="Search"
          onChange={(val) => {
            setSearch(val.target.value);
          }}
        />
      </Row>
      <Table dataSource={bookList} columns={columns} pagination={false} />;
    </>
  );
}
