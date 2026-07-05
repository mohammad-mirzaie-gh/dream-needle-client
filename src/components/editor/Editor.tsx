"use client";

import React, { useState } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import Loading from "./../loading/Loading";

function Page({
  data,
  label,
  setCountWords,
  onChange,
}: {
  data?: string;
  label: string;
  setCountWords: (count: number | string) => void;
  onChange: (data: string) => void;
}) {
  const cloud = useCKEditorCloud({
    version: "44.3.0",
    premium: false,
  });
  const [count, setCount] = useState<string | number>(0);

  if (cloud.status === "error") {
    return (
      <div className="w-full justify-center items-center text-red-600">
        error!!!!
      </div>
    );
  }

  if (cloud.status === "loading") {
    return (
      <div className="w-full justify-center items-center">
        <Loading />
      </div>
    );
  }

  const {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    Link,
    Image,
    ImageCaption,
    ImageInsert,
    List,
    Table,
    WordCount,
    StyleEditing,
    GeneralHtmlSupport,
    SelectAll,
    Highlight,
    Emoji,
    EmojiPicker,
    Mention,
    Code,
    CodeBlock,
  } = cloud.CKEditor;

  return (
    <>
      <h2 className="text-xl my-4 mb-2 w-full">{label}</h2>
      <CKEditor
        editor={ClassicEditor}
        data={data || ""}
        config={{
          language: "fa",
          licenseKey:
            "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzM3MDU1OTksImp0aSI6IjQ0ZWZlZTI5LTQzMWItNDMyOC1hNTRhLWZiNTYwYjZhODU2NyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6IjY0MDRlNGJjIn0.5bMNU03bVwoAKMrVWY2mMs9njU51ggjYNWxWgNYLgfQBKvw6L0C57aU2DrWNWI8fwUtwtTUmCPEmGPmnIhIsaQ",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Heading,
            Link,
            Image,
            ImageCaption,
            ImageInsert,
            List,
            Table,
            WordCount,
            StyleEditing,
            GeneralHtmlSupport,
            SelectAll,
            Highlight,
            Emoji,
            EmojiPicker,
            Mention,
            Code,
            CodeBlock,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "blockQuote",
            "|",
            "formatPainter",
            "Heading",
            "Link",
            "|",
            "Image",
            "ImageCaption",
            "ImageInsert",
            "|",
            "List",
            "Table",
            "StyleEditing",
            "GeneralHtmlSupport",
            "|",
            "SelectAll",
            "Highlight",
            "|",
            "Emoji",
            "EmojiPicker",
            "Mention",
            "|",
            "code",
            "codeBlock",
          ],
          wordCount: {
            onUpdate: (stats) => {
              setCountWords(stats.words);
            },
          },
        }}
        onReady={(editor) => {
          const wordCountPlugin = editor?.plugins?.get("WordCount");
          setCount(wordCountPlugin.words);
          wordCountPlugin.on("update", () => {
            setCount(wordCountPlugin.words);
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          if (onChange) {
            onChange(data);
          }
        }}
      />
      <div
        style={{ color: Number(count) <= 900 ? "red" : "green" }}
        className="w-full font-bold my-4 mr-5"
      >
        تعداد کلمات درج شده {count}
      </div>
    </>
  );
}

export default Page;
