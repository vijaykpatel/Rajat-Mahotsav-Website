"use client"

import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import flags from 'react-phone-number-input/flags'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
            'flex justify-between items-center gap-2 h-14 w-full px-3 text-base bg-white/60 border-2 border-orange-200 text-gray-800 backdrop-blur-sm hover:bg-orange-50 focus:ring-2 focus:ring-orange-200',
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
      <PopoverContent className='w-[300px] p-0 bg-white border-2 border-orange-200 shadow-xl rounded-xl z-50'>
        <div className='p-3'>
          <input 
            placeholder='Search country...' 
            className='w-full p-3 bg-gray-50 border border-orange-200 text-gray-800 placeholder:text-gray-500 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='max-h-72 overflow-y-auto'>
            {filteredCountries.map((country) => (
              <div
                className='flex items-center gap-3 p-3 text-gray-800 hover:bg-orange-100 cursor-pointer rounded-lg transition-all duration-200'
                key={country.value}
                onClick={() => handleSelect(country.value)}
              >
                <FlagComponent country={country.flag} countryName={country.label} />
                <span className='flex-1 text-sm font-medium'>{country.label}</span>
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