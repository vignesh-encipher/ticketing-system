"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tooltip, Tag } from "antd";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineLink,
  AiOutlinePaperClip,
  AiOutlineClose,
  AiOutlineFileText,
} from "react-icons/ai";

// Types for the component
type FileType = {
  file: File;
  id: string;
};

interface TicketEditorProps {
  onChange: (html: string) => void;
  onFilesChange: (files: File[]) => void;
}

const TicketEditor: React.FC<TicketEditorProps> = ({ onChange, onFilesChange }) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ 
        openOnClick: false, 
        HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' } 
      }),
      Placeholder.configure({
        placeholder: "Describe the issue or provide project details...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      // Sync HTML content to Parent
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[180px] p-4 max-w-none',
      },
    },
  });

  // Handle Internal File State and Sync to Parent
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles: FileType[] = Array.from(selected).map((file) => ({
      file,
      id: `${file.name}-${Math.random().toString(36).substr(2, 9)}`,
    }));

    const updatedList = [...files, ...newFiles];
    setFiles(updatedList);
    
    // Sync Raw File Objects to Parent
    onFilesChange(updatedList.map(f => f.file));
    
    // Reset input so same file can be uploaded again if deleted
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (id: string) => {
    const updatedList = files.filter((f) => f.id !== id);
    setFiles(updatedList);
    
    // Sync Raw File Objects to Parent
    onFilesChange(updatedList.map(f => f.file));
  };

  if (!editor) return null;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all focus-within:ring-2 ring-indigo-100 ring-offset-0">
      
      {/* 🛠 TOOLBAR */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-0.5">
          <ToolbarButton 
            icon={<AiOutlineBold />} 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            active={editor.isActive("bold")}
            label="Bold"
          />
          <ToolbarButton 
            icon={<AiOutlineItalic />} 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            active={editor.isActive("italic")}
            label="Italic"
          />
          <ToolbarButton 
            icon={<AiOutlineUnderline />} 
            onClick={() => editor.chain().focus().toggleUnderline().run()} 
            active={editor.isActive("underline")}
            label="Underline"
          />
          
          <div className="w-[1px] h-4 bg-slate-300 mx-2" />

          <ToolbarButton 
            icon={<AiOutlineLink />} 
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }} 
            active={editor.isActive("link")}
            label="Link"
          />

          <ToolbarButton 
            icon={<AiOutlinePaperClip />} 
            onClick={() => fileInputRef.current?.click()} 
            label="Attach Files"
          />
          
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">
          Markdown Supported
        </div>
      </div>

      {/* ✍️ EDITABLE AREA */}
      <div className="relative bg-white cursor-text" onClick={() => editor.chain().focus()}>
        <EditorContent editor={editor} />
      </div>

      {/* 📂 ATTACHMENT PREVIEW PILLS */}
      {files.length > 0 && (
        <div className="px-4 py-3 bg-white border-t border-slate-50 flex flex-wrap gap-2">
          {files.map((f) => (
            <Tag 
              key={f.id}
              className="flex items-center gap-2 bg-slate-100 border-none px-3 py-1.5 rounded-lg text-slate-700 font-medium m-0 hover:bg-slate-200 transition-colors"
            >
              <AiOutlineFileText className="text-indigo-500 text-base" />
              <span className="max-w-[180px] truncate text-xs">{f.file.name}</span>
              <AiOutlineClose 
                className="cursor-pointer hover:text-red-500 text-xs ml-1" 
                onClick={(e) => {
                  e.preventDefault();
                  removeFile(f.id);
                }} 
              />
            </Tag>
          ))}
        </div>
      )}

      {/* 📝 INFO FOOTER */}
      <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 flex justify-end">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
          {editor.storage.starterKit ? "Auto-saving..." : ""}
        </span>
      </div>

      {/* Standard CSS Overrides for Tiptap */}
      <style jsx global>{`
        .ProseMirror {
          min-height: 180px;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #cbd5e1;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};

// Internal Toolbar Button Component
const ToolbarButton = ({ icon, onClick, active = false, label }: any) => (
  <Tooltip title={label} mouseEnterDelay={0.5} placement="bottom">
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-2 rounded-md transition-all flex items-center justify-center ${
        active 
        ? 'bg-indigo-600 text-white shadow-sm' 
        : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
      }`}
    >
      {React.cloneElement(icon, { size: 18 })}
    </button>
  </Tooltip>
);

export default TicketEditor;