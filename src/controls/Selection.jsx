import * as Select from "@radix-ui/react-select"

const className = {
  listItem:
    "hover:bg-black/15 items-center flex dark:hover:bg-white/15 text-lg px-4 rounded data-[state='checked']:font-medium dark:data-[state='checked']:text-white data-[state='checked']:text-black dark:text-white/80 text-black/80",
  listLabel: "text-black/70 text-sm dark:text-white/70 pl-1",
}

// value is in options
// options is an array of values
// labels is either an array of objects with {title: String, items: [strings]}
// or labels is just an array of strings

// options is what value can be set to, while labels is what is displayed in the list
// so they must be index matched

const CheckSVG = () => {
  return (
    <svg className="-ml-4 h-[15px] w-[15px]" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="7.5" r="2.5" fill="currentColor" />
    </svg>
  )
}

const Selection = ({ options, labels, value, setValue }) => {
  let runningIndex = -1
  return (
    <Select.Root className="ml-48" defaultValue={value} value={value} onValueChange={setValue}>
      <Select.Trigger className="rounded-md bg-black/20 px-4 py-2 text-lg font-medium text-black dark:bg-neutral-700 dark:text-white">
        <Select.Value />
      </Select.Trigger>
      <Select.Content className="right-0 top-0 rounded-md bg-neutral-300 p-1 dark:bg-neutral-700">
        <Select.Viewport>
          {/* check if options has groups or is just raw list */}
          {typeof labels[0] === "object" ? (
            labels.map((label, i) => (
              <Select.Group key={"optg_" + i}>
                <Select.Label className={className.listLabel}>{label.title}</Select.Label>
                {label.items.map((item, j) => {
                  runningIndex++
                  return (
                    <Select.Item key={"opt_" + j} value={options[runningIndex]} className={className.listItem}>
                      <Select.ItemIndicator>
                        <CheckSVG />
                      </Select.ItemIndicator>
                      <Select.ItemText>{item}</Select.ItemText>
                    </Select.Item>
                  )
                })}
              </Select.Group>
            ))
          ) : (
            <Select.Group>
              {labels.map((label, i) => {
                return (
                  <Select.Item key={"opt_" + i} value={options[i]} className={className.listItem}>
                    <Select.ItemIndicator>
                      <CheckSVG />
                    </Select.ItemIndicator>
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                )
              })}
            </Select.Group>
          )}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

export default Selection
