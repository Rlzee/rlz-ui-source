import { useId, useRef, useState, ComponentProps } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { InputAddon } from "@ui/components/input-addon";
import { Toggle } from "@ui/components/toggle";
import { Clipboard } from "@ui/components/custom/button/clipboard";

interface InputCopyProps extends ComponentProps<typeof InputAddon> {
  value: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCopy = ({
  value,
  readOnly = true,
  className,
  onChange,
  ...props
}: InputCopyProps) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputAddon
      data-slot="input-copy"
      ref={inputRef}
      id={id}
      className={cn("pe-9", className)}
      type="text"
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      {...props}
    >
      <InputAddon.Right className="pe-0">
        <Clipboard text={value} />
      </InputAddon.Right>
    </InputAddon>
  );
};

type InputCopyCLIProps = {
  commands: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
  };
  readOnly?: boolean;
  className?: string;
  classNameContainer?: string;
};

const InputCopyCLI = ({
  commands,
  readOnly = true,
  className,
  classNameContainer,
}: InputCopyCLIProps) => {
  const id = useId();
  const [selectedPackageManager, setSelectedPackageManager] =
    useState<keyof typeof commands>("npm");
  const inputRef = useRef<HTMLInputElement>(null);

  const packageManagers = Object.keys(commands) as Array<keyof typeof commands>;

  const handlePackageManagerChange = (
    packageManager: keyof typeof commands
  ) => {
    setSelectedPackageManager(packageManager);
    // Update the input value based on the selected package manager
    if (inputRef.current) {
      inputRef.current.value = commands[packageManager];
    }
  };

  return (
    <div className={cn("relative", classNameContainer)}>
      <div className="bg-background-secondary border border-border rounded-t-md h-12 absolute left-0 bottom-7 w-full flex items-center justify-start px-3 text-muted-foreground text-sm pb-1">
        <Terminal size={16} className="text-foreground mr-2" />
        {packageManagers.map((pm) => (
          <Toggle
            key={pm}
            className="h-6 w-auto mr-1"
            pressed={selectedPackageManager === pm}
            onPressedChange={() => handlePackageManagerChange(pm)}
          >
            <span>{pm}</span>
          </Toggle>
        ))}
      </div>
      <InputAddon
        data-slot="input-copy"
        ref={inputRef}
        id={id}
        className={cn("pe-9", className)}
        type="text"
        defaultValue={commands[selectedPackageManager]}
        readOnly={readOnly}
      >
        <InputAddon.Right className="pe-0">
          <Clipboard text={commands[selectedPackageManager]} />
        </InputAddon.Right>
      </InputAddon>
    </div>
  );
};

export { InputCopy, InputCopyCLI };
