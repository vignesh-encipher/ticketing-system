import { Avatar } from "antd";
import { AiOutlineMessage } from "react-icons/ai";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface DiscussionThreadProps {
  comments: any[];
  currentUserId: string;
}

const DiscussionThread = ({ comments, currentUserId }: DiscussionThreadProps) => {
  console.log("comments",currentUserId, comments);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6 text-slate-500 font-bold uppercase text-xs tracking-widest">
        <AiOutlineMessage className="text-lg" /> Discussion Thread
      </div>

      <div className="flex flex-col gap-6 ">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => {
            const isMe = comment.userDetails?.id === currentUserId;
            const user = comment.userDetails || {};

            return (
              <div
                key={comment._id || index}
                className={`flex gap-4 max-w-[85%] ${
                  isMe
                    ? "flex-row-reverse self-end text-left"
                    : "self-start text-left"
                }`}
              >
                {/* Avatar */}
                <Avatar
                  src={user.profileImage}
                  size={40}
                  className="shrink-0 border border-slate-100 shadow-sm font-bold bg-[#1e2b6a]"
                >
                  {user.name?.charAt(0)}
                </Avatar>

                {/* Message Bubble */}
                <div className="flex flex-col">
                  <div
                    className={`flex items-center gap-2 mb-1 ${
                      isMe ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="font-bold text-slate-800 text-sm">
                      {isMe ? "You" : user.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      {user.roleType}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      • {dayjs(comment.createdAt).fromNow()}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white border border-slate-100 text-slate-600 rounded-tl-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: comment.message }}
                  />

                  {/* Actions */}
                  <div
                    className={`mt-2 flex gap-3 text-[11px] font-bold text-slate-400 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="cursor-pointer hover:text-indigo-600 transition-colors">
                      Reply
                    </span>
                    {!isMe && (
                      <span className="cursor-pointer hover:text-indigo-600 transition-colors">
                        Mark as Helpful
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">No messages yet. Start the discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionThread;