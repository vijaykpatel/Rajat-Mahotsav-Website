import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn('flex w-full', className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          onChange={(value) => onChange?.(value || '')}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, any>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        'rounded-e-lg rounded-s-none px-3 py-2 h-14 text-base bg-white/60 border-orange-200 text-gray-800 placeholder:text-gray-400 backdrop-blur-sm outline-none border-l-0 flex-1 w-full border border-t-orange-200 border-r-orange-200 border-b-orange-200 focus:ring-2 focus:ring-orange-200',
        className
      )}
      {...props}
      ref={ref}
    />
  )
);
InputComponent.displayName = 'InputComponent';

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const [searchValue, setSearchValue] = React.useState('');
  
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );
  
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option => 
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          className='flex gap-1 rounded-e-none rounded-s-lg px-3 h-14 bg-white/60 border border-orange-200 text-gray-800 backdrop-blur-sm hover:bg-orange-50 border-r-0'
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cn(
              '-mr-2 h-4 w-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0 bg-white border-2 border-orange-200 shadow-xl rounded-xl z-50'>
        <div className='p-3'>
          <input 
            placeholder='Search country...' 
            className='w-full p-3 bg-gray-50 border border-orange-200 text-gray-800 placeholder:text-gray-500 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='max-h-72 overflow-y-auto'>
            {filteredOptions
              .filter((x) => x.value)
              .map((option) => (
                <div
                  className='flex items-center gap-3 p-3 text-gray-800 hover:bg-orange-100 cursor-pointer rounded-lg transition-all duration-200'
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                >
                  <FlagComponent
                    country={option.value}
                    countryName={option.label}
                  />
                  <span className='flex-1 text-sm font-medium'>{option.label}</span>
                  {option.value && (
                    <span className='text-gray-700 text-sm font-medium'>
                      {`+${RPNInput.getCountryCallingCode(option.value)}`}
                    </span>
                  )}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4 text-gray-800',
                      option.value === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </div>
              ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-sm'>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };