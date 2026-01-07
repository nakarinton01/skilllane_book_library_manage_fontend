import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button, Image, Input, Row, Upload } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import type { UploadProps } from "antd";

import { useGetBookDetail, useUpdateBook } from "src/hook/useBook";
import { confirmAlert } from "utils/dialogs";
import TextError from "components/TextError";
import { getBase64, type FileType } from "utils/image";

const updateSchema = z.object({
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  publication_year: z.number(),
  image: z.string(),
});
type UpdateSchema = z.infer<typeof updateSchema>;

export default function BookUpdatePage() {
  const { id } = useParams();
  const { bookDetail } = useGetBookDetail(Number(id));
  const { submitUpdateBook } = useUpdateBook(Number(id));
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList[0]) {
      const imageBase64 = await getBase64(
        newFileList[0].originFileObj as FileType
      );
      setValue("image", imageBase64);
    }
  };

  const onSubmit = async (data: UpdateSchema) => {
    await confirmAlert({ text: "This form will be saved" }, async () => {
      await submitUpdateBook({
        ...data,
        publication_year: data.publication_year.toString(),
      });
      navigate("/");
    });
  };

  useEffect(() => {
    if (bookDetail) {
      const { title, author, isbn, publication_year, image } = bookDetail;
      setValue("title", title);
      setValue("author", author);
      setValue("isbn", isbn);
      setValue("publication_year", publication_year);
      setValue("image", image);
    }
  }, [bookDetail]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginBottom: "24px" }}>
          <h4>Title</h4>
          <Input
            value={watch("title")}
            placeholder="title"
            onChange={(e) => {
              setValue("title", e.target.value);
            }}
          />

          <TextError message={errors.title?.message} />
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <h4>author</h4>
          <Input
            value={watch("author")}
            placeholder="author"
            onChange={(e) => {
              setValue("author", e.target.value);
            }}
          />
          <TextError message={errors.author?.message} />
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <h4>isbn</h4>
          <Input
            value={watch("isbn")}
            placeholder="isbn"
            onChange={(e) => {
              setValue("isbn", e.target.value);
            }}
          />
          <TextError message={errors.isbn?.message} />
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <h4>publication year</h4>
          <Input
            value={watch("publication_year")}
            placeholder="publication_year"
            onChange={(e) => {
              setValue("publication_year", Number(e.target.value));
            }}
            maxLength={4}
            type="number"
          />
          <TextError message={errors.publication_year?.message} />
        </Row>

        <Row style={{ marginBottom: "24px" }}>
          {!watch("image") ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                onChange={handleChange}
                showUploadList={false}
              >
                Click to Upload
              </Upload>
              <TextError message={errors.image?.message} />
            </div>
          ) : (
            <>
              <Image src={watch("image")} width={100} height={100} />
              <Button
                style={{ marginLeft: "12px" }}
                type="primary"
                icon={<IoTrashBinOutline />}
                onClick={() => {
                  setValue("image", "");
                }}
              />
            </>
          )}
        </Row>
        <Row
          style={{
            marginTop: "36px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Row>
      </form>
    </>
  );
}
