"use client"

import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import flags from 'react-phone-number-input/flags'
import { Button } from '@/components/atoms/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover'
import { cn } from '@/lib/utils'

interface CountryOption {
  value: string
  label: string
  flag: string
}

const countries: CountryOption[] = [
  { value: "australia", label: "Australia", flag: "AU" },
  { value: "canada", label: "Canada", flag: "CA" },
  { value: "england", label: "England", flag: "GB" },
  { value: "india", label: "India", flag: "IN" },
  { value: "kenya", label: "Kenya", flag: "KE" },
  { value: "usa", label: "United States", flag: "US" }
]

interface CountrySelectorProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const FlagComponent = ({ country, countryName }: { country: string; countryName: string }) => {
  const Flag = flags[country as keyof typeof flags]
  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-sm'>
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

export function CountrySelector({ 
  value, 
  onChange, 
  placeholder = "Select your country", 
  disabled = false,
  className 
}: CountrySelectorProps) {
  const [searchValue, setSearchValue] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  
  const selectedCountry = countries.find(country => country.value === value)
  
  const filteredCountries = React.useMemo(() => {
    if (!searchValue) return countries
    return countries.filter(country => 
      country.label.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [searchValue])

  const handleSelect = (countryValue: string) => {
    onChange(countryValue)
    setIsOpen(false)
    setSearchValue('')
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          className={cn(
            'reg-input flex justify-between items-center gap-2 w-full px-3 rounded-md hover:bg-orange-50',
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            {selectedCountry ? (
              <>
                <FlagComponent country={selectedCountry.flag} countryName={selectedCountry.label} />
                <span>{selectedCountry.label}</span>
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0 reg-popover rounded-xl z-50'>
        <div className='p-3'>
          <input 
            placeholder='Search country...' 
            className='w-full p-3 reg-popover-search rounded-lg mb-3 outline-none'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='max-h-72 overflow-y-auto'>
            {filteredCountries.map((country) => (
              <div
                className='flex items-center gap-3 p-3 reg-popover-item cursor-pointer rounded-lg'
                key={country.value}
                onClick={() => handleSelect(country.value)}
              >
                <FlagComponent country={country.flag} countryName={country.label} />
                <span className='flex-1 font-medium'>{country.label}</span>
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4 text-gray-800',
                    country.value === value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}