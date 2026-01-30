.model flat, stdcall
.stack 4096

.data
    node_size equ 12
    value_offset equ 0
    left_offset equ 4
    right_offset equ 8

    preorder_msg db 'Preorder bejaras: [', 0
    postorder_msg db 'Postorder bejaras: [', 0
    newline_msg db 10, 13, 0
    test_msg db 'Fa implementacio teszt', 10, 13, 0
    comma_space db ', ', 0
    close_bracket db ']', 0
    
    ; flag az elso elemre
    first_element dd 0
    
    ; bemeneti string: 1(2(4,5),3(,6))
    input_string db '1(2(4,5),3(,6))', 0
    string_pos dd 0
    
    ; memoria a node-nak (max 100 db)
    node_pool db 1200 dup(0)  ; 100 * 12 bytes
    pool_index dd 0
    
    root_node dd 0

    outbuf db 16 dup(0)

.code
    includelib kernel32.lib
    GetStdHandle proto stdcall :dword
    WriteFile proto stdcall :dword, :dword, :dword, :dword, :dword
    ExitProcess proto stdcall :dword

; szamot stringre alakitas (decimalis, max 10 jegy)
; in = eax - szam
; out = outbuf - string

itoa proc
    push ebx
    push ecx
    push edx
    mov ecx, 10
    mov ebx, offset outbuf+10
    mov byte ptr [ebx], 0
    dec ebx
    cmp eax, 0
    jne itoa_loop
    mov byte ptr [ebx], '0'
    jmp itoa_done
itoa_loop:
    xor edx, edx
    div ecx
    add dl, '0'
    mov [ebx], dl
    dec ebx
    test eax, eax
    jnz itoa_loop
    inc ebx
itoa_done:
    mov eax, ebx
    pop edx
    pop ecx
    pop ebx
    ret
itoa endp

; string kiiras konzolra
; in = eax - string cim
; out = -

print proc
    push ebp
    mov ebp, esp
    push ebx
    push ecx
    push edx
    
    ; console handler
    invoke GetStdHandle, -11
    mov ebx, eax
    
    ; string hossz
    mov eax, [ebp+8] ; string cim
    mov edx, eax
    mov ecx, 0
    calc_len:
        cmp byte ptr [edx+ecx], 0
        je print_len_done
        inc ecx
        jmp calc_len
    print_len_done:
    
    ; konzolra iras
    invoke WriteFile, ebx, edx, ecx, offset outbuf, 0

    pop edx
    pop ecx
    pop ebx
    mov esp, ebp
    pop ebp
    ret 4
print endp

; szam kiirasa konzolra
; in = eax - szam
; out -
print_num proc
    push eax
    call itoa
    push eax
    call print
    add esp, 4
    ret
print_num endp

; memoria allokator - uj node letrehozas
; out = eax - uj node cim
allocate_node proc
    push ebx
    push ecx
    push edx
    
    mov eax, pool_index
    mov ebx, node_size
    mul ebx
    add eax, offset node_pool
    
    ; node inicializalas
    mov dword ptr [eax + value_offset], 0
    mov dword ptr [eax + left_offset], 0
    mov dword ptr [eax + right_offset], 0
    
    ; pool index noveles
    mov ebx, pool_index
    inc ebx
    mov pool_index, ebx
    
    pop edx  
    pop ecx
    pop ebx
    ret
allocate_node endp

; kovetkezo karakter beolvasasa
; out = al - karakter, 0 mikor vege
get_next_char proc
    push ebx
    mov ebx, string_pos
    mov al, byte ptr [input_string + ebx]
    cmp al, 0
    je get_char_end
    inc string_pos
get_char_end:
    pop ebx
    ret
get_next_char endp

; aktualis karakter check
; out = al - karakter
peek_char proc
    push ebx
    mov ebx, string_pos
    mov al, byte ptr [input_string + ebx]
    pop ebx
    ret
peek_char endp

; szam parseolas (max 1 jegy)
; out = eax - szam
parse_number proc
    call get_next_char
    sub al, '0'
    movzx eax, al
    ret
parse_number endp

; rekurziv fa parsing
; out = eax - node cim vagy 0
parse_tree proc
    push ebp
    mov ebp, esp
    push ebx
    push ecx
    push edx
    
    call peek_char
    cmp al, 0
    je parse_empty
    cmp al, ','
    je parse_empty
    cmp al, ')'
    je parse_empty
    
    ; szam parseolasa
    call parse_number
    mov ebx, eax  ; ebx = ertek
    
    ; uj node
    call allocate_node
    mov [eax + value_offset], ebx
    mov ecx, eax  ; ecx = node cim
    
    ; '(' kereses
    call peek_char
    cmp al, '('
    jne parse_done
    
    ; '(' tovabb ugrik
    call get_next_char
    
    ; bal oldal parse
    call parse_tree
    mov [ecx + left_offset], eax
    
    ; ',' kereses + atugras
    call peek_char
    cmp al, ','
    jne skip_comma
    call get_next_char
skip_comma:
    
    ; jobb oldal parse
    call parse_tree
    mov [ecx + right_offset], eax
    
    ; ')' kereses + atugras
    call peek_char
    cmp al, ')'
    jne parse_done
    call get_next_char
    
parse_done:
    mov eax, ecx
    jmp parse_end
    
parse_empty:
    mov eax, 0
    
parse_end:
    pop edx
    pop ecx
    pop ebx
    mov esp, ebp
    pop ebp
    ret
parse_tree endp


; preorder
preorder_traversal proc
    push ebp
    mov ebp, esp
    push ebx

    mov ebx, [ebp+8]
    cmp ebx, 0
    je preorder_end

    ; ell. elso elem?
    cmp first_element, 0
    je first_elem
    
    ; nem elso => ", "
    push offset comma_space
    call print
    jmp print_value
    
first_elem:
    ; elso, set flag
    mov first_element, 1
    
print_value:
    mov eax, [ebx + value_offset]
    call print_num

    push dword ptr [ebx + left_offset]
    call preorder_traversal

    push dword ptr [ebx + right_offset]
    call preorder_traversal

preorder_end:
    pop ebx
    mov esp, ebp
    pop ebp
    ret 4
preorder_traversal endp


; postorder
postorder_traversal proc
    push ebp
    mov ebp, esp
    push ebx

    mov ebx, [ebp+8]
    cmp ebx, 0
    je postorder_end

    push dword ptr [ebx + left_offset]
    call postorder_traversal

    push dword ptr [ebx + right_offset]
    call postorder_traversal

    ; ell. elso elem?
    cmp first_element, 0
    je first_elem_post
    
    ; nem elso => ", "
    push offset comma_space
    call print
    jmp print_value_post
    
first_elem_post:
    ; elso, set flag
    mov first_element, 1
    
print_value_post:
    mov eax, [ebx + value_offset]
    call print_num

postorder_end:
    pop ebx
    mov esp, ebp
    pop ebp
    ret 4
postorder_traversal endp

main proc
    push offset test_msg
    call print

    ; string parsolasa
    mov string_pos, 0
    mov pool_index, 0
    call parse_tree
    mov root_node, eax

    push offset preorder_msg
    call print

    ; flag reset preorder-hez
    mov first_element, 0
    push root_node
    call preorder_traversal

    push offset close_bracket
    call print
    push offset newline_msg
    call print

    push offset postorder_msg
    call print

    ; flag reset postorder-hez
    mov first_element, 0
    push root_node
    call postorder_traversal

    push offset close_bracket
    call print
    push offset newline_msg
    call print

    invoke ExitProcess, 0
main endp

end main