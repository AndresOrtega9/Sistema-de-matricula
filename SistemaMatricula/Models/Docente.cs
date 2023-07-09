//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SistemaMatricula.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Docente
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Docente()
        {
            this.DocentePeriodo = new HashSet<DocentePeriodo>();
            this.GradoSeccionAula = new HashSet<GradoSeccionAula>();
        }
    
        public int IIDDOCENTE { get; set; }
        public string NOMBRE { get; set; }
        public string APPATERNO { get; set; }
        public string APMATERNO { get; set; }
        public string DIRECCION { get; set; }
        public string TELEFONOCELULAR { get; set; }
        public string TELEFONOFIJO { get; set; }
        public string EMAIL { get; set; }
        public Nullable<int> IIDSEXO { get; set; }
        public Nullable<System.DateTime> FECHACONTRATO { get; set; }
        public byte[] FOTO { get; set; }
        public Nullable<int> IIDMODALIDADCONTRATO { get; set; }
        public Nullable<int> BHABILITADO { get; set; }
        public string IIDTIPOUSUARIO { get; set; }
        public Nullable<int> bTieneUsuario { get; set; }
    
        public virtual ModalidadContrato ModalidadContrato { get; set; }
        public virtual Sexo Sexo { get; set; }
        public virtual TIPOUSUARIO TIPOUSUARIO { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DocentePeriodo> DocentePeriodo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GradoSeccionAula> GradoSeccionAula { get; set; }
    }
}
