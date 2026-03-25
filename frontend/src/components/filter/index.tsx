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
}

const Filters: React.FC<FiltersProps> = ({
  FilterItems,
  selectedOption = {},
  setSelectedOption,
  onReset,
}) => {
  // Normalize object/array to array
  const items = Array.isArray(FilterItems) ? FilterItems : Object.values(FilterItems);

  return (
    <div className="flex-1 bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 flex flex-wrap items-center gap-4">
      {items.map((item, index) => {
        if (item.active === false) return null;

        if (item.type === "select") {
          return (
            <div
              key={`${item.name}-${index}`}
              className="bg-[#f5f7f9] hover:bg-[#ebedf0] transition-colors pl-4 pr-1 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 text-gray-800"
            >
              {item.title && (
                <span className="text-gray-400 font-extrabold uppercase tracking-wide text-[11px]">
                  {item.title}:
                </span>
              )}
              <Select
                bordered={false}
                className="min-w-[130px] [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:text-gray-800 shadow-none"
                placeholder={item.placeholder}
                options={item.options}
                value={selectedOption?.[item.name] || item.options?.[0]?.value}
                onChange={(val) =>
                  setSelectedOption && setSelectedOption({ ...selectedOption, [item.name]: val })
                }
              />
            </div>
          );
        }

        if (item.type === "search") {
          return (
            <div
              key={`${item.name}-${index}`}
              className="bg-[#f5f7f9] hover:bg-[#ebedf0] transition-colors px-2 py-1.5 rounded-lg flex items-center"
            >
              {item.title && (
                <span className="text-gray-400 font-extrabold uppercase tracking-wide text-[11px] pl-2 mr-1">
                  {item.title}:
                </span>
              )}
              <Input
                bordered={false}
                placeholder={item.placeholder}
                className="!bg-transparent !shadow-none font-semibold text-gray-800 min-w-[200px]"
                value={selectedOption?.[item.name]}
                onChange={(e) =>
                  setSelectedOption && setSelectedOption({ ...selectedOption, [item.name]: e.target.value })
                }
              />
            </div>
          );
        }

        if (item.type === "datePicker") {
          return (
             <div
              key={`${item.name}-${index}`}
              className="bg-[#f5f7f9] hover:bg-[#ebedf0] transition-colors pl-4 pr-1 py-1.5 rounded-lg flex items-center gap-1"
            >
              {item.title && (
                <span className="text-gray-400 font-extrabold uppercase tracking-wide text-[11px]">
                  {item.title}:
                </span>
              )}
              <DatePicker
                bordered={false}
                placeholder={item.placeholder}
                className="!bg-transparent !shadow-none font-semibold text-gray-800"
                onChange={(date, dateString) =>
                  setSelectedOption && setSelectedOption({ ...selectedOption, [item.name]: dateString })
                }
              />
            </div>
          )
        }

        return null;
      })}

      <div className="ml-auto">
        <button
          onClick={onReset}
          className="text-[#008f85] hover:text-[#007068] font-bold text-sm flex items-center gap-1.5 transition-colors"
        >
          <AiOutlineClear className="text-lg" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
