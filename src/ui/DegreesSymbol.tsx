function DegreeSymbol({ units }: { units: string }) {
  return units === 'imperial' ? <>&#8457;</> : <>&#8451;</>;
}

export default DegreeSymbol;
