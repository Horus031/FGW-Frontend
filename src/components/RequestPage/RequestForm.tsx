import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  VERIFICATION_OPTIONS,
  DOCUMENT_OPTIONS,
} from "../../constants/constants";

type RequestFormProps = {
  requestType: string;
};

const RequestForm = (props: RequestFormProps) => {
  const { requestType } = props;
  const [file, setFile] = useState<File | null>(null);
  const requestOptions =
    requestType === "verification" ? VERIFICATION_OPTIONS : DOCUMENT_OPTIONS;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]); // Lưu tệp đầu tiên được chọn
    }
  };

  return (
    <form className="flex flex-col gap-5 text-sm">
      <div className="flex gap-4.5 items-end">
        <div className="flex flex-col gap-2">
          <Label className="font-medium">
            {requestType === "verification"
              ? "Verification Type"
              : "Request Type"}
          </Label>
          <Select>
            <SelectTrigger className="w-[300px] text-sm" size="base">
              <SelectValue
                placeholder={
                  requestType === "verification"
                    ? "Choose verification type"
                    : "Choose request type"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {requestOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="hover:bg-primary/80 h-11 text-sm cursor-pointer">
          Download template
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-medium">Amount</Label>
        <Input type="number" placeholder="Choose Amount..." className="w-fit" />
      </div>

      <div className="flex flex-col gap-10 w-fit">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="font-medium">Purpose</Label>
            <Textarea
              placeholder="Write your purpose..."
              className="w-3xl h-64"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".pdf,.docx,.doc,.xls,.xlsx,.jpg,.png"
              onChange={handleFileChange}
              id="file-input"
              className="hidden"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer px-4 py-2 border border-blue-600 rounded-full h-8 leading-none text-blue-600 font-semibold hover:bg-blue-600 hover:text-white"
            >
              Choose File
            </label>
            <span className="font-medium">
              {file?.name || "No file provided"}
            </span>
          </div>

          <div className="text-sm">
            <span>
              Attach supporting documents or completed forms (if any) <br />{" "}
              Type of attached file extension includes "x/sx", "pdf", "docx",
              "doc"', "xIs", "jpg" and "png"
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary mx-auto text-white w-fit px-4 py-1 cursor-pointer h-11 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
