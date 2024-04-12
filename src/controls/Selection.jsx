import * as Select from "@radix-ui/react-select"

const className = {
  listItem:
    "items-center flex text-lg px-4 rounded data-[highlighted]:bg-white/10 outline-none data-[state='checked']:font-medium dark:data-[state='checked']:text-white data-[state='checked']:text-black dark:text-white/80 text-black/80",
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
      <Select.Trigger className="button-colors flex items-center gap-2 px-4 py-2">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <Select.Value />
      </Select.Trigger>
      <Select.Content className="right-0 top-0 rounded-md border border-white/30 bg-neutral-900 p-2">
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
