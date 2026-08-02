"use client";

import { useWizard } from "./wizard/WizardContext";
import { Arrow } from "./Icons";
import Magnetic from "./Magnetic";

export default function CtaButton({
  label,
  magnetic = false,
  strength = 18,
  className = "",
  big = false,
}: {
  label: string;
  magnetic?: boolean;
  strength?: number;
  className?: string;
  big?: boolean;
}) {
  const { open } = useWizard();
  const btn = (
    <button
      onClick={open}
      className={`btn-primary ${big ? "!px-9 !py-[18px] !text-[16px]" : ""} ${className}`}
    >
      {label}
      <Arrow />
    </button>
  );
  return magnetic ? <Magnetic strength={strength}>{btn}</Magnetic> : btn;
}
