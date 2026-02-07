import React, { useState } from "react";
import axios from "axios";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { toast } from "sonner";
import { API } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SupportBot = () => {
  const [showSupportBot, setShowSupportBot] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [botForm, setBotForm] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    website: "",
  });
  const [botMessages, setBotMessages] = useState([
    { type: "bot", text: "Hello! Welcome to Namespace Consultants." },
    {
      type: "bot",
      text: "I'm here to help you explore our AI solutions. Please share your details.",
    },
  ]);

  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[0-9]{7,15}$/;
  const handleBotSubmit = async () => {
    if (!botForm.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!nameRegex.test(botForm.name)) {
      toast.error("Name should contain only letters");
      return;
    }

    if (!botForm.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(botForm.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (botForm.phone && !phoneRegex.test(botForm.phone)) {
      toast.error("Phone should contain only numbers (7–15 digits)");
      return;
    }
    setIsTyping(true);

    setBotMessages((prev) => [
      ...prev,
      { type: "user", text: `${botForm.name} - ${botForm.email}` },
    ]);

    try {
      await axios.post(`${API}/contact/send`, {
        name: botForm.name,
        email: botForm.email,
        phone: botForm.phone,
        message: botForm.description || "Contact request from AI Assistant",
        website: botForm.website,
      });

      setTimeout(() => {
        setBotMessages((prev) => [
          ...prev,
          { type: "bot", text: `Thank you ${botForm.name}!` },
          {
            type: "bot",
            text: "Our team will reach out to you within 24 hours.",
          },
        ]);

        setIsTyping(false);
        setBotForm({ name: "", phone: "", email: "", description: "", website: "" });
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        setBotMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `Thank you ${botForm.name}! We've received your request.`,
          },
        ]);

        setIsTyping(false);
        setBotForm({ name: "", phone: "", email: "", description: "", website: "" });
      }, 1500);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-[70]" data-testid="support-bot">
      {showSupportBot ? (
        <div className="w-72 glass rounded-2xl overflow-hidden shadow-2xl animate-slide-up border border-purple-500/20">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-xs">AI Assistant</p>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
            <button
              onClick={() => setShowSupportBot(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close AI assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="h-48 overflow-y-auto p-3 space-y-2 bg-[#12121A]">
            {botMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                    msg.type === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-[#1C2128] text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-1 px-3 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/5 space-y-2 bg-[#12121A]">
            <Input
              placeholder="Your Name *"
              value={botForm.name}
              onChange={(e) => {
                let value = e.target.value;
                if (!nameRegex.test(value)) return;
                if (value.length === 1) {
                  value = value.toUpperCase();
                }
                setBotForm({ ...botForm, name: value });
              }}
              className="bg-[#1C2128] border-white/10 text-xs h-8 focus:border-purple-500"
            />
            <Input
              placeholder="Phone"
              value={botForm.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setBotForm({ ...botForm, phone: value });
              }}
              className="bg-[#1C2128] border-white/10 text-xs h-8 focus:border-purple-500"
            />
            <Input
              placeholder="Email *"
              type="email"
              value={botForm.email}
              onChange={(e) =>
                setBotForm({ ...botForm, email: e.target.value })
              }
              className="bg-[#1C2128] border-white/10 text-xs h-8 focus:border-purple-500"
            />
            <Textarea
              placeholder="Describe your requirement..."
              value={botForm.description}
              onChange={(e) =>
                setBotForm({ ...botForm, description: e.target.value })
              }
              className="bg-[#1C2128] border-white/10 text-xs focus:border-purple-500 resize-none"
              rows={2}
            />
            <div
              className="absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden"
              aria-hidden="true"
            >
              <label className="text-xs text-gray-400" htmlFor="support-website">
                Website
              </label>
              <Input
                id="support-website"
                name="website"
                value={botForm.website}
                onChange={(e) =>
                  setBotForm({ ...botForm, website: e.target.value })
                }
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <Button
              onClick={handleBotSubmit}
              className="w-full btn-primary text-xs rounded-full h-8"
            >
              <Send className="w-3 h-3 mr-1" /> Submit
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowSupportBot(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform"
          aria-label="Open AI assistant"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SupportBot;




