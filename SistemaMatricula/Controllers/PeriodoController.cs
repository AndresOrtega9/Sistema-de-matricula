using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerPeriodos()
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = db.Periodo.Where(p => p.BHABILITADO == 1)
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    p.FECHAINICIO,
                    p.FECHAFIN

                }).ToList()
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIO = ((DateTime)p.FECHAINICIO).ToString("dd/MM/yyyy"),
                    FECHAFIN = p.FECHAFIN.HasValue ? p.FECHAFIN.Value.ToString("dd/MM/yyyy") : string.Empty

                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerPeriodosPorNombre(string nombre)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();

            var lista = db.Periodo.Where(p => p.BHABILITADO == 1 && p.NOMBRE.Contains(nombre))
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    p.FECHAINICIO,
                    p.FECHAFIN
                }).ToList()
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIO = ((DateTime)p.FECHAINICIO).ToString("dd/MM/yyyy"),
                    FECHAFIN =p.FECHAFIN.HasValue?p.FECHAFIN.Value.ToString("dd/MM/yyyy"):string.Empty
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarDatos(int id)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from periodo in db.Periodo
                         where periodo.BHABILITADO.Equals(1) && periodo.IIDPERIODO==id
                         select new
                         {
                             periodo.IIDPERIODO,
                             periodo.NOMBRE,
                             periodo.FECHAINICIO,
                             periodo.FECHAFIN
                         }).ToList();

            var listaFormateada = lista.Select(periodo => new
            {
                periodo.IIDPERIODO,
                periodo.NOMBRE,
                FECHAINICIO = ((DateTime)periodo.FECHAINICIO).ToString("dd/MM/yyyy"),
                FECHAFIN = ((DateTime)periodo.FECHAFIN).ToString("dd/MM/yyyy")
            }).ToList();

            return Json(listaFormateada, JsonRequestBehavior.AllowGet);
        }

        public int Guardar(Periodo periodo)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var numeroDeRegistrosAfectados = 0;
            try
            {
                if (periodo.IIDPERIODO==0)
                {
                    db.Periodo.InsertOnSubmit(periodo);
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }
                else
                {
                    Periodo seleccionado = db.Periodo.Where(p => p.IIDPERIODO.Equals(periodo.IIDPERIODO)).First();
                    seleccionado.NOMBRE = periodo.NOMBRE;
                    seleccionado.FECHAINICIO = periodo.FECHAINICIO;
                    seleccionado.FECHAFIN = periodo.FECHAFIN;
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }

            }catch(Exception ex)
            {
                numeroDeRegistrosAfectados = 0;
            }

            return numeroDeRegistrosAfectados;
        }

        public int Eliminar(Periodo periodo)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var numeroDeRegistrosAfectados = 0;
            try
            {
                Periodo seleccionado = db.Periodo.Where(p => p.IIDPERIODO.Equals(periodo.IIDPERIODO)).First();
                seleccionado.BHABILITADO = periodo.BHABILITADO = 0;
                db.SubmitChanges();
                numeroDeRegistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                numeroDeRegistrosAfectados = 0;
            }

            return numeroDeRegistrosAfectados;
        }
    }
}