import { PageLayout } from "@/components/layout";

export default function GuestsPage() {
  const handleAddGuest = () => {
  }

  return (
    <PageLayout
      title="Hóspedes"
      description="Gerencie todos os hóspedes cadastrados"
      showAddButton
      addButtonLabel="Novo Hóspede"
      onAddClick={handleAddGuest}
      showSearchBar
      searchPlaceholder="Buscar hóspedes por nome ou documento"
    >
    </PageLayout>
  )
}