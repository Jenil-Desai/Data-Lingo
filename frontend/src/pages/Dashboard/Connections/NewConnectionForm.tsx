import { Typography, Select, Input, Option } from "@material-tailwind/react";

export default function NewConnectionForm() {
  return (
    <>
      <div>
        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
          Connection Name
        </Typography>
        <Input
          color="gray"
          size="lg"
          placeholder="eg. White Shoes"
          name="name"
          className="placeholder:opacity-100 focus:!border-t-gray-900"
          containerProps={{
            className: "!min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
          crossOrigin={undefined}
        />
      </div>
      <div>
        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
          Database Type
        </Typography>
        <Select
          className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
          placeholder="1"
          labelProps={{
            className: "hidden",
          }}
        >
          <Option value="mysql">MySQL</Option>
          <Option value="postgressql">PostgreSQL</Option>
          <Option value="oracle">Oracle</Option>
        </Select>
      </div>
      <div>
        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
          Database Connection String
        </Typography>
        <Input
          color="gray"
          size="lg"
          placeholder="mysql://username:password@127.0.0.1:3306/database"
          name="ConnectionString"
          className="placeholder:opacity-100 focus:!border-t-gray-900"
          containerProps={{
            className: "!min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
          crossOrigin={undefined}
        />
      </div>
    </>
  );
}
