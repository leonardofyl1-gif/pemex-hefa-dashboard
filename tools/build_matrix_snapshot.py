#!/usr/bin/env python3
"""Build the public dashboard's compact matrix snapshot from the live workbook."""

import json
import sys
from datetime import date
from pathlib import Path

import pandas as pd


FIELDS = {
    "ID": "id",
    "Dimensión": "dimension",
    "Familia / etapa": "family",
    "Criterio": "criterion",
    "¿Qué es y por qué importa?": "meaning",
    "¿Cómo se mide o verifica?": "verification",
    "Unidad o resultado de la verificación": "unit",
    "Honeywell UOP / Eni — Ecofining": "ecofining",
    "Topsoe — HydroFlex": "hydroflex",
    "Axens — Vegan": "vegan",
    "Referencia técnica independiente": "independent_reference",
    "¿Puede corregirse / mitigarse?": "mitigation",
    "Clasificación": "classification",
    "Estado / validación pendiente": "pending",
}


def clean(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: build_matrix_snapshot.py <workbook.xlsx> <output.json>")

    workbook_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    frame = pd.read_excel(workbook_path, sheet_name="Matriz Madre", header=3, dtype=str)

    missing = [column for column in FIELDS if column not in frame.columns]
    if missing:
        raise SystemExit(f"missing expected columns: {missing}")

    rows = []
    for _, source in frame.iterrows():
        variable_id = clean(source["ID"])
        if not variable_id or variable_id[:1] not in {"T", "L", "R"}:
            continue
        rows.append({target: clean(source[column]) for column, target in FIELDS.items()})

    counts = {prefix: sum(row["id"].startswith(prefix) for row in rows) for prefix in ("T", "L", "R")}
    if counts != {"T": 27, "L": 24, "R": 10}:
        raise SystemExit(f"unexpected variable counts: {counts}")

    payload = {
        "meta": {
            "source": workbook_path.name,
            "synced_on": date.today().isoformat(),
            "counts": counts,
            "scope": "F, G, technology references, N, mitigation, classification and pending status",
        },
        "variables": rows,
    }
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
