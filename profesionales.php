<?php
   /*
   Plugin Name: Profesionales
   Plugin URI: http://maxifalcone.org
   description: Plugin para manejar profesionales 
   Version: 1.0
   Author: Maxi Falcone
   Author http://maxifalcone.org
   License: GPL2
   */

// Our custom post type function
function create_posttype() {
 
    register_post_type( 'especialidades',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Especialidades' ),
                'singular_name' => __( 'Especialidad' ),
                'add_new' => _( 'Agregar especialidad' ),
                'add_new_item' => _( 'especialidad' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'especialidades'),
            'supports' => array('title','page-attributes','excerpt'),
            'show_in_rest'=> true,
            'rest_base' => 'especialidades',
        )
    );

    register_post_type( 'profesionales',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Profesionales' ),
                'singular_name' => __( 'Profesional' ),
                'add_new' => _( 'Agregar profesional' ),
                'add_new_item' => _( 'profesional' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'profesionales-lista'),
            'supports' => array('title','thumbnail','page-attributes','excerpt'),
            'show_in_rest'=> true,
            'rest_base' => 'profesionales',
        )
    );


    flush_rewrite_rules();
}
// Hooking up our function to theme setup
add_action( 'init', 'create_posttype' );


function profesionales_metabox_agregar()
{

    $lospost = ['post', 'wporg_cpt'];
    foreach ($lospost as $elpost) {

        add_meta_box(
            'wporg_box_id_5',        
            'Título',  
            'genero_metabox',  
            'profesionales',
            'normal',
            'high' 
        );

        add_meta_box(
            'wporg_box_id_1',        
            'Apellido',  
            'apellido_metabox',  
            'profesionales',
            'normal',
            'high' 
        );

        add_meta_box(
            'wporg_box_id_2',        
            'Nombres',  
            'nombre_metabox',  
            'profesionales',
            'normal',
            'high' 
        );

        add_meta_box(
            'wporg_box_id_3',        
            'Matrícula',  
            'matricula_metabox',  
            'profesionales',
            'normal',
            'high' 
        );
       
        add_meta_box(
            'wporg_box_id',   
            'Especialidad',  
            'especialidades_metabox',  
            'profesionales',
            'normal',
            'high' 
        );

        add_meta_box(
            'wporg_box_id_4',   
            'Sub especialidad',  
            'subespecialidades_metabox',  
            'profesionales',
            'normal',
            'high' 
        );
     }
}

add_action('add_meta_boxes', 'profesionales_metabox_agregar');


 function especialidades_metabox($post)
{
   global $wpdb;

    $custom_post_type = 'especialidades'; // define your custom post type slug here

     // A sql query to return all post titles
    $results = $wpdb->get_results( $wpdb->prepare( "SELECT ID, post_title FROM {$wpdb->posts} WHERE post_type = %s and post_status = 'publish'", $custom_post_type ), ARRAY_A );

    //print_r($results);
    $seleccionado = get_post_meta($post->ID, '_especialidad_field', true);?>
    <select name="especialidad_field" id="especialidad_field">
        <option disabled selected value> -- seleccione una especialidad -- </option>
        <?php foreach( $results as $index => $post ) { ?>
                <option value="<?php echo $post['ID'];?>" <?php echo $post['ID'] == $seleccionado ? 'selected' : ''?> ><?php echo $post['post_title']; ?> </option>';
        <?php  } ?>
    </select>
        o <a href="<?php echo site_url(); ?>/wp-admin/post-new.php?post_type=especialidades"> agregue uno nuevo</a>
    <?php

}

function apellido_metabox($post){
    $apellido = get_post_meta($post->ID, '_apellido_meta_key', true);?>
     <input tipe="text" name="apellido_field" id="apellido_field" class="my-postbox" placeholder="Apellido" value="<?php echo $apellido; ?>">
     <?php
 }

 function nombre_metabox($post){
    $nombre = get_post_meta($post->ID, '_nombre_meta_key', true);?>
     <input tipe="text" name="nombre_field" id="nombre_field" class="my-postbox" placeholder="Nombres" value="<?php echo $nombre; ?>">
     <?php
 }

 function matricula_metabox($post){
    $matricula = get_post_meta($post->ID, '_matricula_meta_key', true);?>
     <input type="text" name="matricula_field" id="matricula_field" class="my-postbox" placeholder="Matricula" value="<?php echo $matricula; ?>">
        <?php
    }

 function genero_metabox($post){
    $genero = get_post_meta($post->ID, '_genero_meta_key', true);?>
    <select name="genero_field" id="genero_field">
        <option disabled selected value> -- seleccione título -- </option>
        <option value="Masculino" <?php echo $genero == 'Masculino' ? 'selected' : ''?> >Doctor</option>
        <option value="Femenino" <?php echo $genero == 'Femenino' ? 'selected' : ''?> >Doctora</option>
    </select>
    <?php
}

function subespecialidades_metabox($post){
    $subespecialidad = get_post_meta($post->ID, '_subespecialidad_meta_key', true);
    wp_editor( stripslashes($subespecialidad), 'subespecialidad_meta_key', $settings = array('textarea_name'=>'subespecialidad_meta_key', 'teeny' => true, 'textarea_rows' => 5) );
 }


function guardar_especialidad($post_id)
{
    if (array_key_exists('especialidad_field', $_POST)) {
        update_post_meta(
            $post_id,
            '_especialidad_field',
            $_POST['especialidad_field']
        );
    }

    if (array_key_exists('apellido_field', $_POST)) {
        update_post_meta(
            $post_id,
            '_apellido_meta_key',
            $_POST['apellido_field']
        );
    }
    if (array_key_exists('nombre_field', $_POST)) {
        update_post_meta(
            $post_id,
            '_nombre_meta_key',
            $_POST['nombre_field']
        );
    }
    if (array_key_exists('matricula_field', $_POST)) {
        update_post_meta(
            $post_id,
            '_matricula_meta_key',
            $_POST['matricula_field']
        );
    }

    if (array_key_exists('genero_field', $_POST)) {
        update_post_meta(
            $post_id,
            '_genero_meta_key',
            $_POST['genero_field']
        );
    }

    if(array_key_exists('subespecialidad_meta_key', $_POST)){
        update_post_meta(
            $post_id,
            '_subespecialidad_meta_key',
            $_POST['subespecialidad_meta_key']
        );
    }
    
}

add_action('save_post', 'guardar_especialidad');

wp_register_style('mypluginadminstylesheet', '/wp-content/plugins/profesionales/admin-styles.css');

function myplugin_admin_style() {
    wp_enqueue_style('mypluginadminstylesheet');
}
add_action('admin_print_styles', 'myplugin_admin_style');

add_action( 'rest_api_init', 'crear_campo_adicional_api_posts' );
 
function crear_campo_adicional_api_posts() {

    register_rest_field( 'profesionales', 
                'post_meta_fields', 
                array(
                    'get_callback' => 'callback_leer_post_meta'
                    )
                );
}

function callback_leer_post_meta( $object ) {
    $post_id = $object['id'];
    return get_post_meta( $post_id );
}


function profesionales_init() {
    $path = "/frontend/static";
    if(getenv('WP_ENV')!=="development") {
        $path = "/frontend/build/static";
    }
    wp_register_script("my_react_app_js", plugins_url($path."/js/main.js?123", __FILE__), array(), "1.0", false);
    wp_register_style("my_react_app_css", plugins_url($path."/css/main.css?123", __FILE__), array(), "1.0", "all");
}

add_action( 'init', 'profesionales_init' );

// Function for the short code that call React app
function profesionales_public() {
    wp_enqueue_script("my_react_app_js", '1.0', true);
    wp_enqueue_style("my_react_app_css");
    return "<div id=\"my_react_app\"></div>";
}

add_shortcode('profesionales_public', 'profesionales_public');

?>