import { Avatar } from "antd";
import { AiOutlineMessage } from "react-icons/ai";

const DiscussionThread = ({ comments, currentUserId }: { comments: any[], currentUserId: string }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6 text-slate-500 font-bold uppercase text-xs tracking-widest">
        <AiOutlineMessage className="text-lg" /> Discussion Thread
      </div>

      <div className="flex flex-col gap-6">
        {comments.map((comment, index) => {
          const isMe = comment.senderId === currentUserId;

          return (
            <div
              key={comment.id + index}
              className={`flex gap-4 max-w-[85%] ${
                isMe ? 'flex-row-reverse self-end text-right' : 'self-start text-left'
              }`}
            >
              {/* Avatar */}
              <Avatar
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.senderName}`} 
                size={40} 
                className="shrink-0 border border-slate-100 shadow-sm"
              />

              {/* Message Bubble */}
              <div className="flex flex-col">
                <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <span className="font-bold text-slate-800 text-sm">{isMe ? 'You' : comment.senderName}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    {comment.role}
                  </span>
                  <span className="text-[10px] text-slate-300">• {comment.time}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-100 text-slate-600 rounded-tl-none'
                  }`}
                >
                  {comment.text}
                </div>

                {/* Actions */}
                <div className={`mt-2 flex gap-3 text-[11px] font-bold text-slate-400 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <span className="cursor-pointer hover:text-indigo-600 transition-colors">Reply</span>
                  {!isMe && <span className="cursor-pointer hover:text-indigo-600 transition-colors">Mark as Helpful</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscussionThread