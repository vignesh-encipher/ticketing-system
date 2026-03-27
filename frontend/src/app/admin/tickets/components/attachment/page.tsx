import { Button, Modal } from "antd";
import { AiOutlineAlignLeft } from "react-icons/ai";

const AttachmentModal = ({ selectedAttachment, isModalOpen, handleModalClose }: any) => {
  return (
    <Modal
      title={selectedAttachment?.fileName}
      open={isModalOpen}
      onCancel={handleModalClose}
      footer={null}
      width={800}
      centered
      destroyOnClose
      styles={{ body: { padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" } }}
    >
      {selectedAttachment && (
        <div className="w-full">
          {selectedAttachment.fileType?.includes("image") ? (
            <img
              src={selectedAttachment.fileUrl}
              alt={selectedAttachment.fileName}
              className="max-w-full max-h-[70vh] rounded-lg shadow-sm object-contain"
            />
          ) : selectedAttachment.fileType?.includes("pdf") ? (
            <iframe
              src={selectedAttachment.fileUrl}
              title={selectedAttachment.fileName}
              className="w-full h-[70vh] border-none rounded-lg"
            />
          ) : (
            <div className="text-center py-20 flex flex-col items-center gap-6">
              <div className="p-6 bg-slate-50 rounded-full">
                <AiOutlineAlignLeft className="text-5xl text-slate-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Preview not available</h3>
                <p className="text-slate-500 mb-6">This file type cannot be previewed directly in the browser.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AttachmentModal;