"use client";

import { Move } from "chess.js";
import { useState } from "react";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import { pieceNameMap } from "@/hardcode/pieceNameMap";
import gameSidebarMenuItems from "@/hardcode/gameSidebarMenuItems";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";
import { ChatContainer, MessageList, Message, MessageModel, MessageInput, Button } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

interface ChatMessage {
    message: string;
    sender: string;
}

interface GameSidebarProps extends Styleable {
    moves: Move[];
    boardSize: number;
    chatMessages?: ChatMessage[];
    currentUser?: string;
}

// Временные тестовые сообщения
const tempMessages: ChatMessage[] = [
    {
        message: "Привет! Как дела?",
        sender: "user1",
    },
    {
        message: "Отлично, спасибо! А у тебя?",
        sender: "user2",
    },
    {
        message: "Тоже всё хорошо. Давай сыграем!",
        sender: "user1",
    },
];

const adaptMessage = (msg: ChatMessage, isCurrentUser: boolean): MessageModel => ({
    ...msg,
    direction: isCurrentUser ? "outgoing" : "incoming",
    position: "normal",
});

export default function GameSidebar({
                                        className = "",
                                        moves,
                                        boardSize,
                                        chatMessages = tempMessages,
                                        currentUser = "user1",
                                    }: GameSidebarProps) {
    const [currentItem, setCurrentItem] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage: ChatMessage = {
                message: inputValue,
                sender: currentUser,
            };

            setMessages([...messages, newMessage]);
            setInputValue("");
        }
    };

    return (
        <div className={cn("w-full flex flex-col gap-4 h-full", className)}>
            <div
                className="grid grid-rows-[0_0] w-full h-0 border-b-2 border-foreground"
                style={{
                    gridTemplateColumns: `repeat(${gameSidebarMenuItems.length}, auto)`,
                }}
            >
                {gameSidebarMenuItems.map((e, index) => (
                    <div className="relative flex justify-center" key={`game_sidebar_item_${index}`}>
                        <div
                            className={cn(
                                "absolute bottom-3 font-roboto text-base text-foreground text-center whitespace-pre-line",
                                "hover:opacity-100 transition-all cursor-pointer"
                            )}
                            onClick={() => setCurrentItem(index)}
                        >
                            {e.name}
                        </div>
                    </div>
                ))}

                <div
                    className="w-full flex justify-center items-center transition-all"
                    style={{ gridColumnStart: currentItem + 1 }}
                >
                    <RhombusDecor />
                </div>
            </div>

            <div
                className="flex overflow-y-auto border-box"
                style={{
                    height: `${Math.max(0, boardSize - 48)}px`,
                    maxHeight: `${Math.max(0, boardSize - 48)}px`,
                }}
            >
                {currentItem === 0 && (
                    <>
                        <div className="flex h-full gap-5 flex-col items-center w-1/5 border-r-2 border-foreground box-border pt-2">
                            {moves.map((e, index) => (
                                <div
                                    key={`move_indicator_${index}`}
                                    className="flex w-4 h-4 justify-center items-center"
                                >
                                    <RhombusDecor
                                        className={cn(
                                            index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-800",
                                            "border-2 border-primary"
                                        )}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-5 w-2/5 border-r-2 border-foreground box-border pt-2">
                            {moves.map((e, index) => {
                                const name = pieceNameMap[e.piece];
                                const size = name.length > 6 ? "text-sm" : "text-base";

                                return (
                                    <div
                                        key={`move_piece_${index}`}
                                        className={cn(
                                            "text-foreground font-roboto h-4 flex items-center box-border pl-2",
                                            size
                                        )}
                                    >
                                        {name}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col gap-5 w-1/5 border-r-2 border-foreground box-border pt-2">
                            {moves.map((e, index) => (
                                <div
                                    key={`move_from_${index}`}
                                    className="text-foreground font-roboto text-base h-4 flex justify-center items-center"
                                >
                                    {e.from}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-5 w-1/5 box-border pt-2">
                            {moves.map((e, index) => (
                                <div
                                    key={`move_to_${index}`}
                                    className="text-foreground font-roboto text-base h-4 flex justify-center items-center"
                                >
                                    {e.to}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {currentItem === 1 && (
                    <div className="w-full h-full flex flex-col">
                        <style jsx global>{`
                            /* Общие стили для чата */
                            .cs-message-list {
                                background-color: transparent !important;
                                padding: 0 0 !important;
                            }

                            /* Стили для входящих сообщений */
                            .cs-message--incoming .cs-message__content {
                                background-color: #8A5D31 !important;
                                border-radius: 12px !important;
                                color: #ffffff !important;
                            }
                            /* Стили для скроллбара */
                            ::-webkit-scrollbar {
                                width: 8px;
                                height: 8px;
                            }

                            ::-webkit-scrollbar-track {
                                background: transparent;
                            }

                            ::-webkit-scrollbar-thumb {
                                background-color: #8A5D31;
                                border-radius: 4px;
                            }

                            ::-webkit-scrollbar-thumb:hover {
                                background-color: #8A5D31;
                            }


                            /* Стили для исходящих сообщений */
                            .cs-message--outgoing .cs-message__content {
                                background-color: #5D3F22 !important;
                                border-radius: 12px !important;
                                color: #ffffff !important;
                            }

                            .cs-message:not(.cs-message--outgoing) .cs-message__content:after,
                            .cs-message--outgoing .cs-message__content:after {
                                display: none !important;
                            }

                            /* Отступы между сообщениями */
                            .cs-message {
                                margin-bottom: 0.75rem !important;
                            }

                            /* Шрифт сообщений */
                            .cs-message__content {
                                font-family: inherit !important;
                                font-size: 0.875rem !important;
                                line-height: 1.25rem !important;
                            }

                            /* Стили для поля ввода */
                            .cs-message-input {
                                background-color: transparent !important;
                                border-top: 1px solid #d1d5db !important;
                            }

                            .cs-message-input__content-editor {
                                background-color: #f3f4f6 !important;
                                border-radius: 8px !important;
                                padding: 8px 8px 8px 8px !important;
                                min-height: 40px !important;
                            }

                            .cs-message-input__content-editor-wrapper {
                                margin-right: 0 !important;
                                background-color: #5D3F22 !important;
                                border-radius: 8px !important;
                            }

                            .cs-button--send {
                                position: absolute !important;
                                right: 6px !important;
                                bottom: 6px !important;
                                color: #ffffff !important;
                                background-color: #5D3F22 !important;
                                border-radius: 3px !important;
                                padding: 4px !important;
                                margin: 0 !important;
                                width: 32px !important;
                                height: 32px !important;
                                border: 2px solid #ffffff !important;
                                box-shadow: 0 0 0 1px #5D3F22 !important;
                            }

                            .cs-button--send:hover {
                                background-color: #6D4F32 !important;
                            }

                            .cs-message-input__buttons {
                                margin: 4rem !important;
                                position: absolute !important;
                                right: 3px !important;
                                bottom: 3px !important;
                            }

                            .cs-message-input__content-editor-container {
                                position: relative !important;
                                width: 100% !important;
                            }
                        `}</style>

                        <ChatContainer style={{ height: "100%", backgroundColor: "transparent" }}>
                            <MessageList style={{ backgroundColor: "wheat", flex: 1 }}>
                                {messages.map((msg, index) => (
                                    <Message
                                        key={index}
                                        model={adaptMessage(msg, msg.sender === currentUser)}
                                    />
                                ))}
                            </MessageList>
                            <MessageInput
                                placeholder="Введите сообщение..."
                                value={inputValue}
                                onChange={(val) => setInputValue(val)}
                                onSend={handleSendMessage}
                                attachButton={false}
                                sendButton={true}
                                style={{ padding: "10px" }}
                            />
                        </ChatContainer>
                    </div>
                )}
            </div>
        </div>
    );
}