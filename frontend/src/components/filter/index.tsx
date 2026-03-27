"use client";

import React from "react";
import { Input, Select, DatePicker, Row, Col, Form } from "antd";
import { AiOutlineClear } from "react-icons/ai";

const { RangePicker } = DatePicker;

export interface FilterItemDef {
  type: "search" | "select" | "datePicker" | "rangePicker";
  name: string;
  title?: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  active?: boolean;
}

interface FiltersProps {
  FilterItems: Record<string, FilterItemDef> | FilterItemDef[];
  selectedOption?: any;
  setSelectedOption?: (val: any) => void;
  onReset?: () => void;
  onApply?: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  FilterItems,
  selectedOption = {},
  setSelectedOption,
  onReset,
  onApply,
}) => {
  // Normalize object/array to array
  const items = Array.isArray(FilterItems) ? FilterItems : Object.values(FilterItems);

  return (
    <div className="flex-1 w-full bg-[#f8f9fa] rounded-[16px] p-6 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-sm border border-gray-100/50">
      <div className="flex flex-1 gap-6 w-full">
        {items.map((item, index) => {
          if (item.active === false) return null;

          return (
            <div key={`${item.name}-${index}`} className="flex-1 flex flex-col gap-2">
              {item.title && (
                <label className="text-gray-500 font-extrabold text-[11px] uppercase tracking-widest ml-1">
                  {item.title}
                </label>
              )}
              
              {item.type === "select" && (
                <Select
                  className="w-full"
                  placeholder={item.placeholder}
                  options={item.options}
                  value={selectedOption?.[item.name] || undefined}
                  onChange={(val) =>
                    setSelectedOption && setSelectedOption({ ...selectedOption, [item.name]: val })
                  }
                  suffixIcon={
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  size="large"
                  showSearch
                  allowClear
                />
              )}

              {item.type === "search" && (
                <Input
                  placeholder={item.placeholder}
                  className="w-full bg-white border border-gray-200 text-gray-800  font-semibold rounded-[12px] px-4 shadow-sm hover:border-[#89eed4] focus:border-[#89eed4]"
                  value={selectedOption?.[item.name]}
                  onChange={(e) =>
                    setSelectedOption && setSelectedOption({ ...selectedOption, [item.name]: e.target.value })
                  }
                />
              )}

              {item.type === "datePicker" && (
                <DatePicker
                  placeholder={item.placeholder}
                  className="w-full bg-white border border-gray-200 text-gray-800 font-semibold rounded-[12px] px-4  shadow-sm hover:border-[#89eed4] focus:border-[#89eed4]"
                  onChange={(date, dateString) =>
                    setSelectedOption && setSelectedOption({ ...selectedOption, [item.name]: dateString })
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="shrink-0 flex items-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm flex items-center gap-1.5 transition-colors px-4"
          >
            <AiOutlineClear className="text-lg" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
