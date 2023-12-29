import { Stack } from "@mantine/core";
import { ExampleDocLink } from "./ExampleDocLink";
import { ExampleDataType } from "@/app/examples/examples-data";

export function ExampleLinks({linksData} : {linksData: ExampleDataType[]}) {
  return linksData.map((item) => (
    <Stack>
      <ExampleDocLink item={item} />
    </Stack>));
}
