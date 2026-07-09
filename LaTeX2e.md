---
title: LaTeX2e
category: LaTeX2e
layout: 2017/sheet
tags: [Featured]
updated: 2023-06-27
weight: -10
intro: |
 [Latex](https://www.latex-project.org/) is a high-quality typesetting system;
  This reference was made for LaTeX2e
---

# LaTeX Cheat Sheet

## Document Structure

### Document Class
- `\documentclass{}` - Specifies the type of document. Common document classes include:
  - `article` - For articles in journals, short reports, and documentation.
  - `report` - For longer reports, theses, and dissertations.
  - `book` - For books.
  - `letter` - For letters.
  - `beamer` - For presentations.
  
### Packages
- `\usepackage{}` - Loads additional packages for extended functionality. Packages add features such as including images, formatting tables, adding code listings, and more.

### Document Structure
- `\begin{document}` - Begins the document. All content should be placed after this command.
- `\end{document}` - Ends the document. Nothing should be placed after this command.

### Sections
- `\section{}` - Creates a new section with a heading. Sections are numbered by default.
- `\subsection{}` - Creates a new subsection within a section.
- `\subsubsection{}` - Creates a new subsubsection within a subsection.

### Table of Contents
- `\tableofcontents` - Generates a table of contents based on the section headings in the document.

## Formatting Text

### Font Styles
- `\textbf{}` - Formats text in bold.
- `\textit{}` - Formats text in italics.
- `\underline{}` - Underlines text.

### Font Size
Font sizes can be changed using commands such as:
- `\tiny`
- `\scriptsize`
- `\footnotesize`
- `\small`
- `\normalsize`
- `\large`
- `\Large`
- `\LARGE`
- `\huge`
- `\Huge`

### Lists
- `\begin{itemize}` - Begins a bulleted list.
- `\item` - Adds an item to the bulleted list.
- `\end{itemize}` - Ends the bulleted list.

- `\begin{enumerate}` - Begins a numbered list.
- `\item` - Adds an item to the numbered list.
- `\end{enumerate}` - Ends the numbered list.

## Mathematical Equations

### Inline Math
- `$ equation $` - Inserts an equation within the text using inline math mode. The equation is surrounded by `$` symbols.

### Display Math
- `\[ equation \]` - Displays an equation on its own line using display math mode. The equation is surrounded by `\[` and `\]` symbols.

### Superscripts and Subscripts
- `x^2` - Formats `x` as a superscript.
- `x_1` - Formats `x` as a subscript.

### Fractions
- `\frac{numerator}{denominator}` - Creates a fraction with the specified numerator and denominator.

### Greek Letters
- Greek letters can be inserted using their respective LaTeX commands, such as:
  - `\alpha` - Alpha
  - `\beta` - Beta
  - `\gamma` - Gamma
  - ...

### Sum and Integral
- `\sum` - Inserts a summation symbol.
- `\int` - Inserts an integral symbol.

### Matrices
- Various matrix environments are available:
  - `\begin{matrix} ... \end{matrix}` - Basic matrix.
  - `\begin{pmatrix} ... \end{pmatrix}` - Matrix enclosed in parentheses.
  - `\begin{bmatrix} ... \end{bmatrix}` - Matrix enclosed in square brackets.
  - `\begin{vmatrix} ... \end{vmatrix}` - Matrix enclosed in vertical bars.

## Figures and Tables

### Figures
- `\begin{figure} ... \end{figure}` - Creates a figure environment for inserting images.
- `\includegraphics[options]{image_file}` - Inserts an image with specified options.

### Tables
- `\begin{table} ... \end{table}` - Creates a table environment for creating tables.
- `\begin{tabular}{columns} ... \end{tabular}` - Defines the table structure with the specified number of columns.
- `&` - Separates table columns.
- `\\` - Starts a new row in the table.

## References and Citations

### Labels and References
- `\label{label_name}` - Defines a label for a section, equation, figure, or table. Labels are used to refer to specific sections, equations, figures, or tables.
- `\ref{label_name}` - Refers to the labeled section, equation, figure, or table.

### Bibliography and Citations
- LaTeX supports bibliographies and citations using the BibTeX system. To include a bibliography and citations in your document:
  - Define the bibliography style using `\bibliographystyle{style}`.
  - Include the bibliography file using `\bibliography{bibfile}`.
  - Cite references using `\cite{citation_key}`.

## Miscellaneous

### Comments
- `% comment` - Inserts a comment. Comments are ignored by the LaTeX compiler and are useful for adding notes to your code.

### Horizontal Line
- `\hrule` - Inserts a horizontal line.

### Page Break
- `\newpage` - Starts a new page.

### Special Characters
- Certain characters have special meaning in LaTeX. To typeset these characters, you need to use the corresponding LaTeX command:
  - `\$` - Dollar sign
  - `\%` - Percent sign
  - `\&` - Ampersand
  - `\_` - Underscore
  - `\{ \}` - Curly braces

## Conclusion

This cheat sheet provides a quick reference for LaTeX commands and syntax. For more detailed information, consult the official LaTeX documentation or visit the [LaTeX Documentation](https://www.latex-project.org/help/documentation/).
