"use client";
import { EditorContent, JSONContent, useEditor, type Editor } from "@tiptap/react";
import { Button } from "./ui/button";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  MessageSquareCode,
  MessageSquareQuote,
  Pilcrow,
  Redo2,
  SeparatorHorizontal,
  Strikethrough,
  TextQuote,
  Underline,
  Undo2,
  

} from "lucide-react";
export const Menubar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-5">
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
        type="button"
      >
        {" "}
        <Heading1 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
        type="button"
      >
        {" "}
        <Heading2 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
        type="button"
      >
        {" "}
        <Heading3 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        variant={
          editor.isActive("heading", { level: 4 }) ? "default" : "secondary"
        }
        type="button"
      >
        {" "}
        <Heading4 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
        type="button"
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Bold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
      >
        <Italic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
        type="button"
      >
        <Strikethrough />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "default" : "secondary"}
        type="button"
      >
        <Code />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "default" : "secondary"}
        type="button"
      >
        <List />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "default" : "secondary"}
      >
        <ListOrdered />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant={editor.isActive("paragraph") ? "outline" : "secondary"}
      >
        <Pilcrow />
      </Button>
     
      <Button variant="outline" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
      <SeparatorHorizontal />

      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive('blockquote') ? 'default' : 'secondary'}
      >
    <MessageSquareQuote />
      </Button>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo2 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo2 />
      </Button>
    </div>
  );
};
export function TipTapEditor({json , setJson}:{
    json:JSONContent | null,
    setJson:any
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json ?? "<p>Hello world</p>",
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
    onUpdate({editor}) {
      const json = editor.getJSON()
      setJson(json)
    },
  });
  
  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent
        editor={editor}
        className="rounded-lg border p-2 mt-3 min-h-[200px] cursor-text"
      />
    </div>
  );
}
