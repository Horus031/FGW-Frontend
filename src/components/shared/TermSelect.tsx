import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'


const TermSelect = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[190px]">
          <SelectValue placeholder="Select Terms" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Fall2025">Fall 2025</SelectItem>
            <SelectItem value="1">Fall 2025</SelectItem>
            <SelectItem value="2">Fall 2025</SelectItem>
            <SelectItem value="3">Fall 2025</SelectItem>
            <SelectItem value="4">Fall 2025</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TermSelect;
