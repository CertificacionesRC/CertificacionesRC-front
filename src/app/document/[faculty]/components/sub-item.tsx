import { ISubItem } from '@/utils/models'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
import { useRouter, usePathname, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation'
import DeepItems from './deep-items'

function SubItem({ index, subindex, item }: { index: number; subindex: number; item: ISubItem }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleToggle = (index: number, searchParams: ReadonlyURLSearchParams) => {
    const createQueryString = (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (params.get('subitem') === String(index)) params.delete(name)
      else params.set(name, value)
      return params.toString()
    }

    const query = createQueryString('subitem', String(index))
    router.replace(pathname + '?' + query, {
      scroll: false,
    })
  }

  return (
    <AccordionItem overflow="hidden" border="0" rounded="md" bg="gray.100">
      <AccordionButton textAlign="left" onClick={() => handleToggle(subindex, searchParams)}>
        {index + 1}.{subindex + 1} {item.name}
        <AccordionIcon ml="auto" />
      </AccordionButton>
      <AccordionPanel>
        <DeepItems id={item.id} index={index} subindex={subindex} />
      </AccordionPanel>
    </AccordionItem>
  )
}

export default SubItem
