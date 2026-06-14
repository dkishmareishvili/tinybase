/**
 * The schematizers module provides utilities for converting schemas from
 * popular validation libraries into TinyBase's schema format.
 *
 * Schematizers perform "best-effort" conversion, extracting basic type
 * information (string, number, boolean) and default values while discarding
 * complex validation rules that TinyBase doesn't support.
 * @packageDocumentation
 * @module schematizers
 * @since v7.1.0
 */
export type {Schematizer} from '../index.d.ts';
