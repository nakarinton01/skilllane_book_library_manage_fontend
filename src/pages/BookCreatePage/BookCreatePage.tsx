import { Button, Input, Row, Upload, Image } from "antd";
import type { UploadProps } from "antd";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";

import TextError from "components/TextError";
import { useCreateBook } from "src/hook/useBook";
import { confirmAlert } from "utils/dialogs";
import { getBase64, type FileType } from "utils/image";

const createSchema = z.object({
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  publication_year: z.number(),
  image: z.string(),
});
type CreateSchema = z.infer<typeof createSchema>;

export default function BookCreatePage() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
  });
  const { submitCreateBook } = useCreateBook();
  const navigate = useNavigate();

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

  const onSubmit = async (data: CreateSchema) => {
    await confirmAlert({ text: "This form will be saved" }, async () => {
      await submitCreateBook({
        ...data,
        publication_year: data.publication_year.toString(),
      });
      navigate("/");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginBottom: "24px" }}>
          <h4>Title</h4>
          <Input
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
            <div style={{display: "flex", flexDirection: 'column'}}>
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
            Create
          </Button>
        </Row>
      </form>
    </>
  );
}
