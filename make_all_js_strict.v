module main

import os

const vexe = os.getenv('VEXE')

fn main() {
	js_files := os.walk_ext('./server', '.js')
	total_files_count := js_files.len
	mut changed_files_count := 0
	for js_file in js_files {
		print(js_file)
		content := os.read_file(js_file) or { panic(err) }
		lines := content.split('\n')
		first_line := lines[0]
		if first_line.contains("'use strict'") || first_line.contains('"use strict"') {
			println(' [skip]')
			continue
		}
		mut new_content := "'use strict'\n" + content
		os.write_file(js_file, new_content)
		println(' [changed]')
		changed_files_count++
	}
	println('Change $changed_files_count/$total_files_count files')
}
